import { AudioWaveform } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Link to={url}>
          <AudioWaveform className="size-4" />
        </Link>
      </div>
    </div>
  );
};


export default Logo;
