import { Profile } from '@/lib/definitions';
import { placeholderProfiles } from '@/lib/placeholder-data';

// Development toggle for simulating errors
const simulateError = false;
const simulateNetworkDelay = 500; // ms

export async function fetchProfiles(): Promise<Profile[]> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch profiles');
  }
  
  return placeholderProfiles;
}

export async function fetchProfileById(profileId: string): Promise<Profile | null> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch profile');
  }
  
  const profile = placeholderProfiles.find(p => p.profileId === profileId);
  return profile || null;
}

export async function fetchProfileByPointId(pointId: string): Promise<Profile | null> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch profile by point ID');
  }
  
  // In real implementation, pointId might be different from profileId
  // For now, treat them as the same
  const profile = placeholderProfiles.find(p => p.profileId === pointId);
  return profile || null;
}

export async function fetchProfilesByOwner(ownerId: string): Promise<Profile[]> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch profiles by owner');
  }
  
  return placeholderProfiles.filter(p => p.ownerId === ownerId);
} 