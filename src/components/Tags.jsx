export default function Tags({ categories }) {
  return <div className="tags">{categories.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>;
}
