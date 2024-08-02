import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Graph } from '@/components/graph';
import { LoaderCircle } from 'lucide-react';

const ResultPage = () => {
  const { id } = useParams();
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState('Processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data, error } = await supabase
          .from('simulations')
          .select('*')
          .eq('form_id', id)
          .limit(1)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          setStatus('Not found');
        } else {
          setStatus(data.status);
          if (data.status === 'Completed') {
            setResults(data.results);
          } else if (data.status === 'Error') {
            setError(data.error);
          }
        }
      } catch (err) {
        console.error('Supabase Error:', err);
        setError(err.message);
      }
    };

    const pollResults = () => {
      fetchResults();
      if (status === 'Processing') {
        setTimeout(pollResults, 5000); // Poll every 5 seconds
      }
    };

    pollResults();
  }, [id, status]);

  if (status === 'Processing' || status === 'Not found') {
    return (
      <>
        <div className="z-[-1] fixed inset-0 h-full w-full bg-[radial-gradient(#808387_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]" />
        <div className="flex justify-center flex-col p-16 items-center w-full h-screen">
          <div className='flex flex-col text-center mb-80 gap-2'>
            <h1 className='text-3xl font-semibold'>
              {status === 'Processing' ? 'Analyse des résultats...' : 'Calcul des Simulations...'}
            </h1>
            <h2 className='text-xl text-muted-foreground text-center'>Veuillez patienter</h2>
            <LoaderCircle className="mx-auto animate-spin" size={60} />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
      <div className="z-[-1] fixed inset-0 h-full w-full bg-[radial-gradient(#808387_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]" />
      <div className="flex justify-center flex-col p-16 items-center w-full h-screen">
        <div className='flex flex-col text-center mb-80 gap-2'>
          <h1 className='text-3xl font-semibold'>Erreur :/</h1>
          <h2 className='text-xl text-muted-foreground text-center'>{error}</h2>
        </div>
      </div>
      </>);
  }

  return (
    <>
    <div className="z-[-1] fixed inset-0 h-full w-full bg-[radial-gradient(#808387_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]" />
    <div className="flex justify-center flex-col p-16 items-center w-full">
      <div className='flex flex-col text-center m-4 mt-8 gap-2'>
        <h1 className='text-3xl font-semibold'>Résultats de la simulation</h1>
        <h2 className='text-xl text-muted-foreground text-center'>Comparez les différents objectifs</h2>
      </div>
      {results && <Graph data={results} />}
    </div>
    </>
  );
};

export default ResultPage;
