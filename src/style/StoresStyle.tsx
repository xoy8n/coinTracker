import styled from "styled-components";

export const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
`;

export const StoresList = styled.ul``;

export const Store = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-right: 20px;
  margin-bottom: 20px;
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px;
    transition: color 0.2s ease-in;
    min-height: 100px;
    width: 100%;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
  button {
    color: red;
    svg {
      flex: 1 0 20%;
      height: 30px;
    }
  }
`;

export const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;

export const Loader = styled.span`
  display: block;
  text-align: center;
`;
export const LikeCount = styled.span`
  display: block;
  font-weight: bold;
  font-size: 30px;
`;
