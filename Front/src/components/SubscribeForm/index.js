/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import composants & hooks
import {
  Button, Form, Header, Segment, Message,
} from 'semantic-ui-react';
import { useForm } from 'react-hook-form';

// == Import style
import './subscribe-form.scss';

const SubscribeForm = ({
  subscribeUser, isLogged, loading, serverErrors, setNeedSubscribe, setPopup, initServerErrors,
}) => {
  const { register, handleSubmit, errors } = useForm();

  // Will run ONLY if tests are OK
  const onSubmit = (formData) => {
    subscribeUser(formData);
  };

  const handleReturn = () => {
    setNeedSubscribe(false);
    initServerErrors();
  };

  if (isLogged) {
    setTimeout(() => setPopup(false), 1000);
  }

  return (
    <div className="subscribe-form">
      <Header as="h2" textAlign="center">
        Inscrivez vous !
      </Header>
      <Form size="large" onSubmit={handleSubmit(onSubmit)} loading={loading}>
        <Segment stacked>
          <Form.Field error={!!errors.email || !!serverErrors.email}>
            <input
              type="email"
              placeholder="Adresse email"
              ref={register({ required: 'Il vous faut un email' })}
              name="email"
            />
          </Form.Field>
          <p className="subscribe-form-info">{errors.email ? errors.email.message : null }</p>
          <Form.Field error={!!errors.password}>
            <input
              type="password"
              placeholder="Mot de passe"
              ref={register({
                required: 'Il vous faut un mot de passe bien solide',
                minLength: {
                  value: 8,
                  message: 'Le mot de passe doit faire au moins 8 caractères',
                },
                validate: (value) => [
                  /[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/,
                ].every((pattern) => pattern.test(value)) || 'Il vous faut au moins 1 majuscule, 1 chiffre et 1 caractère spécial, courage !',
              })}
              name="password"
            />
          </Form.Field>
          <p className="subscribe-form-info">{errors.password ? errors.password.message : null }</p>
          <Form.Field error={!!errors.pseudo || !!serverErrors.pseudo}>
            <input
              type="text"
              placeholder="Pseudo"
              ref={register({ required: 'Et votre pseudo ?' })}
              name="pseudo"
            />
          </Form.Field>
          <p className="subscribe-form-info">{errors.pseudo ? errors.pseudo.message : null}</p>
          <Form.Field error={!!errors.terms}>
            <div htmlFor="terms" className="subscribe-form-label-container">
              <label htmlFor="terms">Accepter les termes et conditions</label>
              <input
                id="terms"
                type="checkbox"
                ref={register({ required: 'Vous devez accepter les termes et conditions pour vous inscrire' })}
                name="terms"
              />
            </div>
            <p className="subscribe-form-info">{errors.terms ? errors.terms.message : null}</p>

          </Form.Field>
          <Button primary fluid size="large">
            S'inscrire
          </Button>
        </Segment>
      </Form>
      {Object.entries(serverErrors).length !== 0 // Error object is not empty ?
        && <Message warning header="😲 Il y a un petit problème..." list={Object.entries(serverErrors).map((error) => `${error[0]} : ${error[1]}`)} />}
      <Button
        className="login-form-subscribe-button"
        onClick={handleReturn}
      >
        Retour
      </Button>
    </div>
  );
};

SubscribeForm.defaultProps = {
  pseudo: '',
};

SubscribeForm.propTypes = {
  subscribeUser: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  pseudo: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  serverErrors: PropTypes.shape({
    email: PropTypes.string,
    pseudo: PropTypes.string,
  }).isRequired,
  setNeedSubscribe: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  initServerErrors: PropTypes.func.isRequired,
};

export default SubscribeForm;
