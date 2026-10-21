import toast from 'react-hot-toast';

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
    return true;
  } catch {
    toast.error('Failed to copy');
    return false;
  }
}
