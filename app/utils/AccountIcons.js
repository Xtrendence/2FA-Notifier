const icons = {
  instagram: 'instagram',
  reddit: 'reddit',
  twitter: 'twitter',
  cloudflare: 'cloudflare',
  microsoft: 'microsoft',
};

export default function getAccountIcon(account) {
  try {
    let name = account.toLowerCase();
    if (name in icons) {
      return icons[name];
    }

    return 'user';
  } catch (error) {
    return 'user';
  }
}
