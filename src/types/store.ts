export interface IStoreInterface extends React.HtmlHTMLAttributes<HTMLElement> {
    id: string;
    name: string;
    innerRef : React.Ref<HTMLLIElement>
}