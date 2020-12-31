export const signup = /* GraphQL */ `
  mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      accessToken
      user {
        id
        name
      }
    }
  }
`;

export const signin = /* GraphQL */ `
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const createDraft = /* GraphQL */ `
  mutation createDraft($title: String!, $content: String!) {
    createDraft(data: { title: $title, content: $content }) {
      title
      published
    }
  }
`;
