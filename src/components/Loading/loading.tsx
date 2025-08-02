import "@/components/Loading/loading.scss";

const Loading = () => {
  return <section className="loading section">
    <div className="loading__inner container">
      <div className="loading__hero">
        <div className="loading__hero-left"></div>
        <div className="loading__hero-right"></div>
      </div>
      <div className="loading__body"></div>
    </div>
  </section>;
}

export default Loading;