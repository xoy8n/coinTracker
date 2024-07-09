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
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 35px;
  color: ${(props) => props.theme.accentColor};
`;

export const Loader = styled.span`
  display: block;
  text-align: center;
`;

export const Description = styled.p`
  margin: 20px 0;
`;
