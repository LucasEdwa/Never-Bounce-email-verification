import React from 'react';

function App() {
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  async function verifyEmail(email: string, apiKey: string) {
    const url = `/api/v4/single/check?key=${apiKey}&email=${email}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      console.log('API Response:', data); // Log the entire response

      if (data.result === 'valid') {
        console.log(`${email} is valid`);
        setSuccess(`${email} is valid`);
        setError(null); // Clear any previous error
      } else {
        console.log(`${email} is invalid: ${data.result}`);
        setError(`${email} is invalid: ${data.result}`);
      }
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);

    const apiKey = import.meta.env.VITE_NEVERBOUNCE_APIKEY as string;
    const email = data.email as string;
    await verifyEmail(email, apiKey);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 w-96 bg-gray-100 rounded-lg m-auto justify-center mt-40">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">Submit</button>
        {error ? <p className="text-red-500">Error: {error}</p> : null}
        {success ? <p className="text-green-500">Success: {success}</p> : null}
      </form>
    </>
  );
}

export default App;