export interface IStoreInterface extends React.HtmlHTMLAttributes<HTMLElement> {
  id: string;
  title: string;
  innerRef: React.Ref<HTMLLIElement>;
}
