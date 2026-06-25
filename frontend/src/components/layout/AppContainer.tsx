interface Props {
    children: React.ReactNode;
}

const AppContainer = ({ children } : Props) => {
  return (
    <div className='max-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'> {children} </div>
  )
}

export default AppContainer