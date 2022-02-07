import sanityClient from '@sanity/client';

export const client = sanityClient({
    projectId: 'rk7gxqpd',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'skxRjsoW9cNazn2cGAAU3YfjULsJ53OY74jZ3CujKCa9gCzVeM8HfuphDtnv0HGOJ2wRfaj3Mz2Y7QHWJ18uJ113OeIsuNhBS9NRj4jS5IrqEWpoOSuOTBlr0CWph8jYAib7XgjqlyZy5nfiZaEL5UHFE90EOJzve5qLr9xAMRSLFVh4H8aE',
    useCdn: false,
});
