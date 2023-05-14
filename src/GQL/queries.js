import { gql } from "@apollo/client";

export const getAllProducts = gql`
  query ExampleQuery {
    products {
      id
      image {
        id
        name
        url
      }
      price
      title
      description
    }
  }
`;

export const getProductById = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      description
      id
      image {
        id
        url
        name
      }
      price
      title
    }
  }
`;

export const LOGIN_FORM_SUBMIT = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
    }
  }
`;

export const CREATE_AND_UPDATE_USER_CART = gql`
  mutation UpdateUserCart($input: updateUserCartInput) {
    updateUserCart(input: $input) {
      userCart {
        ItemCart {
          id
          Quantity
        }
        UserId
      }
    }
  }
`;

export const GET_USER_CART_PRODUCTS = gql`
  query UserCart($userCartId: ID!) {
    userCart(id: $userCartId) {
      id
      ItemCart {
        Quantity
        id
        product {
          id
          price
          title
          description
          image {
            url
          }
        }
      }
    }
  }
`;

export const GET_USER_CONTACT_INFO = gql`
  query UserInfo($userInfoId: ID!) {
    userInfo(id: $userInfoId) {
      location
      unit
      postal_code
      email
      state
      phone_number
    }
  }
`;

export const POST_USER_CONTACT_DATA = gql`
  mutation UpdateUserInfo($input: updateUserInfoInput) {
    updateUserInfo(input: $input) {
      userInfo {
        postal_code
        unit
        email
        state
        location
        phone_number
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: createOrderInput) {
    createOrder(input: $input) {
      order {
        id
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      name
      slug
    }
  }
`;


export const GET_PRODUCT_BY_CATEGORY = gql`
query Products($where: JSON) {
  products(where: $where) {
    id
      image {
        id
        name
        url
      }
      price
      title
      description
    }
}`;
