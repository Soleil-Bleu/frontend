import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Home, ParkingSquare, Zap, LoaderCircle } from 'lucide-react';
import CompassSelect from '@/components/compassSelect';

const API_URL = import.meta.env.VITE_API_URL;

export function FormPage() {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    prix_achat: '',
    type_installation: '',
    localisation: '',
    surface: '',
    orientation: '',
    inclinaison: '',
    file: null,
    montant_pret: '',
    taux_pret: '',
    duree_pret: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      id: Math.floor(Math.random() * 1000000),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };


  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Votre email est requis.";
    if (!formData.prix_achat) newErrors.prix_achat = "Le prix d'achat est requis.";
    if (!formData.type_installation) newErrors.type_installation = "Le type d'installation est requis.";
    if (!formData.localisation) newErrors.localisation = 'Le code postal est requis.';
    if (!formData.surface) newErrors.surface = 'La surface max est requise.';
    if (!formData.orientation) newErrors.orientation = 'L\'orientation est requise.';
    if (!formData.inclinaison) newErrors.inclinaison = 'L\'inclinaison est requise.';
    if (!formData.file) newErrors.file = 'Le fichier est requis.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const formDataObj = new FormData();
    formDataObj.append('id', formData.id);
    formDataObj.append('email', formData.email)
    formDataObj.append('prix_achat', formData.prix_achat);
    formDataObj.append('type_centrale', formData.type_installation);
    formDataObj.append('localisation', formData.localisation);
    formDataObj.append('surface', formData.surface);
    formDataObj.append('orientation', formData.orientation);
    formDataObj.append('inclinaison', formData.inclinaison);
    formDataObj.append('file', formData.file);
    formDataObj.append('montant_pret', formData.montant_pret || 0);
    formDataObj.append('taux_pret', formData.taux_pret || 0);
    formDataObj.append('duree_pret', formData.duree_pret || 0);

    console.log('Form Data:', Object.fromEntries(formDataObj.entries()));

    const PROD_MODE = 1; // !!! temporarly deactivate while development
    try {
      if (PROD_MODE) {
        const response = await axios.post(`${API_URL}/calc_simulation`, formDataObj);
      }

      const webhookResponse = await axios.get('https://dev.tondu.work/webhook/new-form', {
        params: {
          email: formData.email,
          id: formData.id
        }
      });
      
      window.location.href = `/confirmation?email=${encodeURIComponent(formData.email)}`;
    
    } catch (error) {
      if (error.response && error.response.data.detail) {
        setErrors(error.response.data.detail);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="z-[-1] fixed inset-0 h-full w-full bg-[radial-gradient(#808387_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]" />
      <div className="flex justify-center flex-col p-16 items-center w-full">
        <Card className="bg-background p-6">
          <CardHeader>
            <CardTitle>Nouvelle simulation</CardTitle>
            <CardDescription>
              Remplissez le formulaire pour lancer la simulation de votre projet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='grid pt-4 grid-cols-2 w-full gap-14'>

              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="prix_achat">Prix auquel vous achetez l'électricité :</Label>
                <div className='flex flex-row items-center space-x-2 space-y-0'>
                  <Input
                    className="text-right w-3/4 [&::-webkit-inner-spin-button]:appearance-none"
                    name="prix_achat"
                    id="prix_achat"
                    type="number"
                    value={formData.prix_achat}
                    onChange={handleChange}
                    placeholder="25" />
                  <Label htmlFor="prix_achat">c€/kWh</Label>
                </div>
                {errors.prix_achat && <span className="text-red-500">{errors.prix_achat}</span>}
              </div>
              <div className="grid w-3/4 max-w-sm items-center gap-2">
                <Label htmlFor="type_installation">Type d'installation :</Label>
                <Select onValueChange={(value) => handleSelectChange('type_installation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre projet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toiture">
                      <div className='flex items-center gap-2'>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Toiture</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ombriere">
                      <div className='flex items-center gap-2'>
                        <ParkingSquare className="mr-2 h-4 w-4" />
                        <span>Ombrière</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.type_installation && <span className="text-red-500">{errors.type_installation}</span>}
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <div className='flex flex-row gap-2 items-center'>
                  <Label htmlFor="localisation">Code postal du projet :</Label>
                </div>
                <div className='flex w-3/4 flex-row items-center space-x-2 space-y-0'>
                  <Input
                    name="localisation"
                    id="localisation"
                    type="number"
                    value={formData.localisation}
                    onChange={handleChange}
                    placeholder="44100" />
                </div>
                {errors.localisation && <span className="text-red-500">{errors.localisation}</span>}
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <div className='flex flex-row gap-2 items-center'>
                  <Label htmlFor="surface">Surface max. disponible :</Label>
                </div>
                <div className='flex w-3/4 flex-row items-center space-x-2 space-y-0'>
                  <Input
                    className="text-right w-3/4"
                    name="surface"
                    id="surface"
                    type="number"
                    value={formData.surface}
                    onChange={handleChange}
                    placeholder="120" />
                  <Label htmlFor="surface">m²</Label>
                </div>
                {errors.surface && <span className="text-red-500">{errors.surface}</span>}
              </div>
              <div className="grid w-3/4 max-w-sm items-center gap-2">
                <Label htmlFor="orientation">Orientation de la surface :</Label>
                <CompassSelect
                  selectedOrientation={formData.orientation}
                  onSelect={(value) => handleSelectChange('orientation', value)}
                />
                {errors.orientation && <span className="text-red-500">{errors.orientation}</span>}
              </div>
              <div className="flex flex-col w-full max-w-sm items-start gap-2">
                <Label htmlFor="inclinaison">Inclinaison de la surface :</Label>
                <div className='flex flex-row  w-3/4 items-center space-x-2 space-y-0'>
                  <Input
                    className="text-right w-3/4"
                    name="inclinaison"
                    id="inclinaison"
                    type="number"
                    value={formData.inclinaison}
                    onChange={handleChange}
                    placeholder="25" />
                  <Label htmlFor="inclinaison">°</Label>
                </div>
                {errors.inclinaison && <span className="text-red-500">{errors.inclinaison}</span>}
              </div>
              <div className="flex flex-col col-span-2 gap-4">
                <div className='flex flex-row gap-2 items-center'>
                  <Label htmlFor="file">Relevé de consommation Enedis :</Label>
                </div>
                <Input
                  className='block h-9 px-0 py-0 file:bg-secondary/75 file:px-4 file:py-2 file:cursor-pointer file:mr-4 hover:file:bg-secondary'
                  placeholder="Votre relevé de consommation Enedis"
                  type="file"
                  accept="text/csv"
                  onChange={handleFileChange}
                />
                {errors.file && <span className="text-red-500">{errors.file}</span>}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='link' className='w-full text-right m-0 h-2 text-muted-foreground'>
                      Où trouver ce fichier ?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl py-8">
                    <DialogHeader>
                      <DialogTitle>Trouver ma courbe de consommation</DialogTitle>
                      <DialogDescription>
                        Nous avons besoin de votre fichier .csv fourni par Enedis.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col gap-2 text-justify max-h-64 overflow-y-auto pr-2'>
                      <p className="font-normal">
                        Si vous possédez un compteur Linky, rendez-vous sur votre compte client Enedis
                        (ou créez-le si ce n'est pas déjà fait). Vous pouvez ensuite exporter vos relevé
                        de consommation depuis l'onglet <code>Suivre mes mesures</code>.
                      </p>
                      <img src="/screen_enedis.png" alt="capture d'écran du site Enedis" />
                      <p className='italic'>
                        Veillez à bien sélectionner le Type de données <code>Consommation horaire</code> et
                        une Période couvrant au moins une année complète afin de bénéficier d'une précision maximale.
                      </p>
                    </div>
                    {/*                     <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
                  </DialogContent>
                </Dialog>
              </div>
              <div className='flex flex-col col-span-2 gap-4 bg-secondary/40 p-4 rounded-md'>
                <div className="flex flex-row items-center gap-2">
                  <Label className="text-lg">Prêt</Label>
                  <p className='text-primary/80 text-xs'>(optionnel, seulement si vous en envisagez un)</p>
                </div>
                <div className='flex flex-row gap-8'>
                  <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="montant_pret">Montant</Label>
                    <div className='flex flex-row items-center space-x-2 space-y-0'>
                      <Input
                        className="text-right [&::-webkit-inner-spin-button]:appearance-none"
                        name="montant_pret"
                        id="montant_pret"
                        type="number"
                        value={formData.montant_pret}
                        onChange={handleChange}
                        placeholder="15000" />
                      <Label htmlFor="montant_pret">€</Label>
                    </div>
                    {errors.montant_pret && <span className="text-red-500">{errors.montant_pret}</span>}
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="taux_pret">Taux</Label>
                    <div className='flex flex-row items-center space-x-2 space-y-0'>
                      <Input
                        className="text-right [&::-webkit-inner-spin-button]:appearance-none"
                        name="taux_pret"
                        id="taux_pret"
                        type="number"
                        value={formData.taux_pret}
                        onChange={handleChange}
                        placeholder="5" />
                      <Label htmlFor="taux_pret">%</Label>
                    </div>
                    {errors.taux_pret && <span className="text-red-500">{errors.taux_pret}</span>}
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="duree_pret">Durée</Label>
                    <div className='flex flex-row items-center space-x-2 space-y-0'>
                      <Input
                        className="text-right [&::-webkit-inner-spin-button]:appearance-none"
                        name="duree_pret"
                        id="duree_pret"
                        type="number"
                        value={formData.duree_pret}
                        onChange={handleChange}
                        placeholder="10" />
                      <Label htmlFor="duree_pret">ans</Label>
                    </div>
                    {errors.duree_pret && <span className="text-red-500">{errors.duree_pret}</span>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col col-span-2 w-full items-start gap-2">
                <Label htmlFor="inclinaison">Votre Email :</Label>
                <div className='flex flex-row  w-3/4 items-center space-x-2 space-y-0'>
                  <Input
                    className="w-3/4"
                    name="email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@soleil-bleu.pro" />
                </div>
                {errors.email && <span className="text-red-500">{errors.email}</span>}
              </div>
              <button
                type="submit"
                className="col-span-2 font-semibold px-6 py-4 rounded-sm flex flex-row items-center justify-center group bg-primary stroke-ring hover:bg-accent-foreground"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="mr-2 h-6 w-6 text-primary-foreground animate-spin" />
                    <span className="text-primary-foreground">Simulations en cours...</span>
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4 text-primary-foreground group-hover:rotate-180 ease-in-out duration-500" />
                    <span className="text-primary-foreground">Lancer la Simulation</span>
                  </>
                )}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
