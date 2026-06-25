interface Props {
    title: string;
    subtitle?: string;
}

const PageTitle = ({title, subtitle} : Props) => {
  return (
    <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}  </p>}
    </div>
  )
}

export default PageTitle