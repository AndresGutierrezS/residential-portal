
interface Props {
    title: string;
    description?: string;
    action?: React.ReactNode
}

export const PageHeader = ({title, description, action}: Props) => {
  return (
    <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
              <p className="text-gray-600 mt-1">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
    </div>
  )
}
