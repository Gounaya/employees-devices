'use server'

import { revalidatePath } from 'next/cache'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

// Employee-related functions
export async function getEmployees() {
  const response = await fetch(`${API_URL}/employees`)
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data.data || []
}

export async function addEmployee(data) {
  const response = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "name": data.name, "role": data.role }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to add employee: ${response.status}`);
  }
  
  const result = await response.json();
  if (!result.id) {
    throw new Error('Failed to create employee: No ID returned');
  }
  
  revalidatePath('/employees');
  return { id: result.id, ...data };
}

export async function updateEmployee(id, data) {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (result.error) {
    throw new Error(result.error)
  }
  revalidatePath('/employees');
}

export async function deleteEmployee(id) {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: 'DELETE',
  })
  const result = await response.json()
  if (result.error) {
    throw new Error(result.error)
  }
  revalidatePath('/employees');
}



// Device-related functions
export async function getDevices() {
  const response = await fetch(`${API_URL}/devices`)
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data.data || []
}

export async function addDevice(data) {
  const response = await fetch(`${API_URL}/devices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "name": data.name, "type": data.type, "owner": data.owner }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to add device: ${response.status}`);
  }
  
  const result = await response.json();
  if (!result.id) {
    throw new Error('Failed to create device: No ID returned');
  }
  
  revalidatePath('/devices');
  return { id: result.id, ...data };
}

export async function updateDevice(id, data) {
  const response = await fetch(`${API_URL}/devices/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (result.error) {
    throw new Error(result.error)
  }
  revalidatePath('/devices');
}

export async function deleteDevice(id) {
  const response = await fetch(`${API_URL}/devices/${id}`, {
    method: 'DELETE',
  })
  const result = await response.json()
  if (result.error) {
    throw new Error(result.error)
  }
  revalidatePath('/devices');
}

