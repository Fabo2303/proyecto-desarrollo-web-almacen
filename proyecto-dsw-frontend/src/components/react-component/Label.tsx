interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {

}

export default function Label({children, ...props}: Props) {
    return (
        <label className="px-2 text-zinc-900 font-bold"
            {...props}
        >
            {children}
        </label>
    );
}