import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Image, Card, Header,
} from 'semantic-ui-react';
import Loic from 'src/assets/images/image2.png';
import Sebastien from 'src/assets/images/image5.png';
import Zoé from 'src/assets/images/image3.png';
import Raphael from 'src/assets/images/image4.png';
import Marion from 'src/assets/images/image1.png';
import './aboutus.scss';

const AboutUs = () => {
  const history = useHistory();

  return (

    <div className="AboutUs">
      <div className="cardplace">
        <h1 className="typewriter">TaleMe</h1>
        <h2>DreamTeam </h2>
        <div className="textaboutus">
          <p>TaleMe est une application tout public qui permet de
            créer et de vivre des histoires interactives.
            L’application est inspirée des “Livres dont vous êtes le Héros”.
          </p>

          <p>A l’heure où la lecture a besoin d’être de plus en plus “transportable”
            et en ligne, avec les liseuses et les livres audio tels que Audible,
            l’application proposée ici offre aux utilisateurs une expérience
            interactive et personnalisée du début à la fin par le biais d’une
            interface agréable, simple d’utilisation, ainsi que responsive.
            Les utilisateurs ont l’occasion de créer en quelques clics du
            contenu qui leur ressemble de A à Z et qui s’adapte à leurs besoins
            et leurs envies.
          </p>
        </div>
        <Card.Group itemsPerRow={5} doubling centered>
          <div className="card1">
            <Image src={Loic} wrapped ui={false} />
            <div className="card-info">
              <Header as="h3" color="violet">Monsieur UseEffect</Header>
              <div className="card-meta">Loïc : Product Owner</div>
              <Card.Description>
                Sa mission ? Résoudre tous les problèmes du monde à
                l'aide du UseEffect (on lui demandera bientôt de résoudre
                la faim dans le monde avec ça)
              </Card.Description>
            </div>
          </div>

          <div className="card2">
            <Image src={Sebastien} wrapped ui={false} />
            <div className="card-info">
              <Header as="h3" color="orange">Monsieur Bach</Header>
              <div className="card-meta">Sébastien : Git Master </div>
              <Card.Description>
                Sa mission ? Gérer la symphonie des bugs entre le front et le back
                (et le cycle de sommeil de Zoé en coupant le serveur à minuit)
              </Card.Description>
            </div>
          </div>

          <div className="card3">
            <Image src={Zoé} wrapped ui={false} />
            <div className="card-info">
              <Header as="h3" color="blue">Madame Ternaire</Header>
              <div className="card-meta">Zoé : Scrum Master </div>
              <Card.Description>
                Sa mission ? Vous faire aimer les ternaires en en insérant le plus possible
                (spoiler : elle a réussi)
              </Card.Description>
            </div>
          </div>

          <div className="card4">
            <Image src={Raphael} wrapped ui={false} />
            <div className="card-info">
              <Header as="h3" color="green">Monsieur EasyAdmin</Header>
              <div className="card-meta">Raphaël : Lead Dev Back </div>
              <Card.Description>
                Sa mission ? Dompter l'interface de EasyAdmin et gérer l'afflux de bugs
                (Il a concocté ça au poil)
              </Card.Description>
            </div>
          </div>

          <div className="card5">
            <Image src={Marion} wrapped ui={false} />
            <div className="card-info">
              <Header as="h3" color="pink">Madame Branch-d</Header>
              <div className="card-meta">Marion : Lead Dev Front </div>
              <Card.Description>
                Sa mission ? Effacer toutes les branches sur lesquelles elle a fait
                des bêtises (si le site fonctionne, c'est qu'elle a réussi)
              </Card.Description>
            </div>
          </div>
        </Card.Group>
      </div>
      <Button onClick={() => history.push('/')}>Retour à l'accueil</Button>

    </div>
  );
};

export default AboutUs;
