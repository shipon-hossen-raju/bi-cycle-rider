type TSectionTitle = {
  subtitle: string;
  title: string;
  description?: string;
  parentStyle?: string;
};

export default function SectionTitle({
  subtitle,
  title,
  description,
  parentStyle = "text-white",
}: TSectionTitle) {
  return (
    <>
      <div className={`${parentStyle} text-center max-w-[867px] mx-auto mb-14`}>
        <h6 className="text-sm font-medium tracking-[4.32px] text-brand">
          {subtitle}
        </h6>
        <h1 className="text-4xl font-semibold mt-2 mb-9">{title}</h1>
        <p className="">{description}</p>
      </div>
    </>
  );
}
