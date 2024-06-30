const Button = ({ text }) => {
  return (
    <button className='flex w-full justify-center mt-5 rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
      {text}
    </button>
  );
};

export default Button;
