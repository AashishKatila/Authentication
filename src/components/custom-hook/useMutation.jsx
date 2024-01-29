import { useMutation } from 'react-query';

const useLogin = () => {
  const loginMutation = useMutation(async (userData) => {
    const response = await fetch('https://rest-api-bjno.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  });

  const loginUser = async (userData) => {
    try {
      const data = await loginMutation.mutateAsync(userData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { loginUser, loginMutation };
};

export default useLogin;
