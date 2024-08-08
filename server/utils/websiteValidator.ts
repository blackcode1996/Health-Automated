import validator from 'validator';

export const isValidWebsite = (website: string): boolean => {
  return validator.isURL(website, {
    protocols: ['http', 'https'],
    require_protocol: true
  });
};