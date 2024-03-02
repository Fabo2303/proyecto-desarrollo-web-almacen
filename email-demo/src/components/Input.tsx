interface Props extends React.InputHTMLAttributes<HTMLInputElement> {

}

export default function Input(props: Props) {
    return (
        <input className="border-solid border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            {...props}
        />
    );
}