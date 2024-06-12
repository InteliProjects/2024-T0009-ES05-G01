import FooterLink from './FooterLink';
import FooterSocial from './FooterSocial';
import social from '../assets/static/footerSocial.json';
import links from '../assets/static/footerLinks.json';

export default function Footer() {
  return (
    <footer className="bg-white bottom-0 min-w-full flex-col justify-center items-center p-5 flex">
      <div className="flex flex-col justify-center w-[80%] ">
        <img className="self-center mb-3 w-28 " src="/logo_gf.svg" alt="" />
        <div className="flex justify-between content-between flex-col flex-wrap my-3 h-20 sm:m-3 sm:h-4 sm:flex-row">
          {links.map((l) => (
            <FooterLink key={l.nome} nome={l.nome} href={l.href || '/'} />
          ))}
        </div>
      </div>
      <img className="my-3 w-[80%]" src="/stripe.svg" alt="" />
      <div className="flex w-1/5 justify-around my-3">
        {social.map((s) => (
          <FooterSocial
            key={s.nome}
            nome={s.nome}
            href={s.href || '/'}
            img={s.img}
          />
        ))}
      </div>

      <div className="mt-3">
        <p className="text-black font-sans">ASAS | Inteli</p>
      </div>
    </footer>
  );
}
