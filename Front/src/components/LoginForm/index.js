/* eslint-disable jsx-a11y/label-has-associated-control */
// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import composants & hooks
import {
  Button, Form, Header, Message, Segment, Icon,
} from 'semantic-ui-react';
import { useForm } from 'react-hook-form';

// == Import style
import './login-form.scss';

const LoginForm = ({
  logInUser, isLogged, loading, setPopup, setNeedSubscribe, serverErrors, initServerErrors,
}) => {
  const { register, handleSubmit, errors } = useForm();

  // Will run ONLY if tests are OK
  const onSubmit = (formData) => {
    logInUser(formData);
  };

  const handleReturn = () => {
    initServerErrors();
    setPopup(false);
  };

  const handleSubscribe = () => {
    setNeedSubscribe(true);
    initServerErrors();
  };

  if (isLogged) {
    initServerErrors();
    setPopup(false);
  }

  return (
    <div className="login-form">
      <Header as="h2" textAlign="center">
        Connectez vous à votre compte
      </Header>
      <Form size="large" onSubmit={handleSubmit(onSubmit)} loading={loading}>
        <Segment stacked>
          <Form.Field error={!!errors.email} disabled={isLogged}>
            <input
              type="email"
              placeholder="Adresse email"
              ref={register({ required: 'required' })}
              name="email"
            />
          </Form.Field>
          <Form.Field error={!!errors.password} disabled={isLogged}>
            <input type="password" placeholder="Mot de passe" ref={register({ required: 'required' })} name="password" />
          </Form.Field>
          <Form.Field error={!!errors.terms}>
            <div htmlFor="remember" className="login-form-label-container">
              <label htmlFor="remember">Se souvenir de moi</label>
              <input
                id="remember"
                type="checkbox"
                ref={register()}
                name="remember"
              />
            </div>
          </Form.Field>
          <Button disabled={isLogged} type="submit" primary fluid size="large">
            Se connecter
          </Button>
        </Segment>
      </Form>
      <div className="login-form-button-container">
        <Button
          className="login-form-subscribe-button"
          icon
          color="blue"
          basic
          labelPosition="right"
          onClick={handleSubscribe}
        >
          <Icon name="write" />Créer un compte
        </Button>
        <Button
          className="login-form-subscribe-button"
          onClick={handleReturn}
        >Retour
        </Button>
      </div>
      {Object.entries(serverErrors).length !== 0 // Error object is not empty ?
        && <Message warning header="😲 Il y a un petit problème..." list={Object.entries(serverErrors).map((error) => `${error[0]} : ${error[1]}`)} />}
    </div>
  );
};

LoginForm.propTypes = {
  logInUser: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  setPopup: PropTypes.func.isRequired,
  setNeedSubscribe: PropTypes.func.isRequired,
  serverErrors: PropTypes.shape({
    email: PropTypes.string,
    pseudo: PropTypes.string,
  }).isRequired,
  initServerErrors: PropTypes.func.isRequired,
};

export default LoginForm;
