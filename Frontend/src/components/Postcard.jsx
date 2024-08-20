import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./index";

const Postcard = ({ _id, coverImage, title, description }) => {
  return (
    <Link to={`/blog/${_id}`}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <img
          className="object-cover w-full h-48 rounded-t-lg"
          src={coverImage}
          alt={title}
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>

          <p className="mb-3 font-normal text-gray-700">{description}</p>
          <Button
            to={`/blog/${_id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white rounded-lg"
          >
            Read more
            <ArrowRightIcon className="w-3.5 h-3.5 ml-2" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default Postcard;
