export async function fetchCredits(token: string): Promise<number> {
    const response = await fetch('/api/auth/credits', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch credits');
    }
    
    const data = await response.json();
    return data.credits;
  }
  
  export async function decrementCredits(token: string): Promise<number> {
    const response = await fetch('/api/auth/credits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ action: 'decrement' }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update credits');
    }
    
    const data = await response.json();
    return data.credits;
  }