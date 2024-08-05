import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Graph } from '@/components/graph';
import { LoaderCircle } from 'lucide-react';

const ResultPage = () => {
  const { id } = useParams();
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState('Processing');
  const [error, setError] = useState(null);

  // Function to fetch results from Supabase
  const fetchResults = useCallback(async () => {
    try {
      console.log('Fetching results...');
      const { data, error } = await supabase
        .from('simulations')
        .select('*')
        .eq('form_id', id)
        .limit(1)
        .single();

      if (error) {
        console.error('Supabase Error:', error);
        if (error.code === 'PGRST116') {
          // Handle the specific error when multiple rows are returned
          setError('Multiple rows returned when only one was expected.');
        } else {
          setError(error.message);
        }
        throw error;
      }

      if (!data) {
        console.log('No data found');
        setStatus('Not found');
      } else {
        console.log('Data found:', data);
        setStatus(data.status);
        if (data.status === 'Completed') {
          console.log('Status is Completed');
          setResults(data.results);
        } else if (data.status === 'Error') {
          console.log('Status is Error');
          setError(data.error);
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    }
  }, [id]);

  // Effect to handle polling logic
  useEffect(() => {
    let interval;
    // Only poll when status is Processing, Not found, or Received
    if (status === 'Processing' || status === 'Not found' || status === 'Received') {
      fetchResults();
      interval = setInterval(fetchResults, 5000);
    }
    // Cleanup function to stop polling
    return () => clearInterval(interval);
  }, [status, fetchResults]);

  if (status === 'Processing' || status === 'Not found' || status === 'Received') {
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
      </>
    );
  }

  return (
    <>
      <div className="z-[-1] fixed inset-0 h-full w-full bg-[radial-gradient(#808387_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]" />
      <div className="flex justify-center flex-col p-16 items-center w/full">
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
