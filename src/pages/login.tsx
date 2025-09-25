import { useState } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

export default function AdminLogin() {
  const { login } = useFirebaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Rediriger vers le dashboard admin
    } catch (err) {
      setError('Échec de la connexion');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Connexion Admin</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="input mb-2"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input mb-2"
      />
      <button onClick={handleLogin} className="btn btn-primary">
        Se connecter
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
