import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center gap-8 pb-12">
      <h1 className="font-bold text-center text-3xl">Página não encontrada</h1>
      <img src="/404.svg" alt="Erro 404" className="w-96" />
      <p className="text-center">
        A página que você está procurando não existe ou foi removida. Que tal
        voltar para a página inicial?
      </p>
      <Link to="/">
        <Button variant="secondary">Voltar para a página inicial</Button>
      </Link>
    </section>
  );
}
