const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchNewsletters = async () => {
  try {
    const response = await fetch(`${API_URL}/newsletter`);
    if (!response.ok) {
      throw new Error('Failed to fetch newsletters');
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching newsletters: ${error.message}`);
  }
};

export const addNewsletter = async (newsletterData) => {
  try {
    const response = await fetch(`${API_URL}/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsletterData),
    });
    if (!response.ok) {
      throw new Error('Failed to add newsletter');
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error adding newsletter: ${error.message}`);
  }
};

export const updateNewsletter = async (id, newsletterData) => {
  try {
    const response = await fetch(`${API_URL}/newsletter/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsletterData),
    });
    if (!response.ok) {
      throw new Error('Failed to update newsletter');
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error updating newsletter: ${error.message}`);
  }
};

export const deleteNewsletter = async (id) => {
  try {
    const response = await fetch(`${API_URL}/newsletter/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete newsletter');
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error deleting newsletter: ${error.message}`);
  }
};