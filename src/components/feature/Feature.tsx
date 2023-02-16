function Feature({label, prob, icon}: {label: string, prob: number, icon: string}) {

  const getColorByProb = (prob: number) => {
    if(prob > 0.66) return 'text-nilg-green'
    if(prob > 0.33) return 'text-nilg-yellow'
    return 'text-nilg-orange';
  }

  return (
    <div className="flex flex-col text-center items-center mb-3">
      <div className="border-solid border-slate-500 rounded-full">
        <img src={icon} alt={label}/>
      </div>
      <div className="text-xs font-medium">{label}</div>
      <div className={"text-xs font-semibold " + getColorByProb(prob)}>{prob}</div>
    </div>
  )
}

export default Feature;