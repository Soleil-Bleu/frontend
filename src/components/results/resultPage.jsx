import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Graph } from '@/components/results/graph';
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
        let errorMessage;
        if (error.code === 'PGRST116') {
          errorMessage = 'Plusieurs lignes retournées alors qu\'une seule était attendue.';
        } else {
          errorMessage = error.message;
        }
        setError(`Une erreur s'est produite lors de la récupération des résultats : ${errorMessage}`);
        throw new Error(errorMessage);
      }

      if (!data) {
        console.log('No data found');
        setStatus('Not found');
        setError('Aucune donnée trouvée pour l\'ID fourni.');
      } else {
        console.log('Data found:', data);
        setStatus(data.status);
        if (data.status === 'Completed') {
          console.log('Status is Completed');
          const results = data.results;
          if (results && results.points_simu && results.scenarios) {
            setResults(results);
          } else {
            const invalidDataError = 'Structure de données invalide reçue.';
            console.error(invalidDataError, results);
            setError(invalidDataError);
            throw new Error(invalidDataError);
          }
        } else if (data.status === 'Error') {
          console.log('Status is Error');
          setError(data.error || 'Une erreur s\'est produite pendant la simulation.');
        } else {
          console.log('Status is Processing or Received');
          setError('La simulation est toujours en cours. Veuillez patienter un moment et réessayer.');
        }
      }
    } catch (err) {
      console.error('Fetch results error:', err);
      setError(`Une erreur inattendue s'est produite : ${err.message}`);
    }
  }, [id]);

  // Effect to handle polling logic
  useEffect(() => {
    let interval;
    if (status === 'Processing' || status === 'Not found' || status === 'Received') {
      fetchResults();
      interval = setInterval(fetchResults, 5000);
    }
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

  if (error && status !== 'Completed') {
    return (
      <>
        <div className="z-[-1] fixed inset-0 h-full w-full bg-[radial-gradient(#808387_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]" />
        <div className="flex justify-center flex-col p-16 items-center w-full h-screen">
          <div className='flex flex-col text-center mb-80 gap-2'>
            <h1 className='text-3xl font-semibold'>Erreur :/</h1>
            <h2 className='text-xl text-muted-foreground text-center'>{error}</h2>
            <p className='text-muted-foreground text-center'>
              Si le problème persiste, veuillez contacter le support avec les détails suivants : <br />
              <code>{JSON.stringify({ id, status, error })}</code>
            </p>
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
