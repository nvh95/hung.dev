import {
  FacebookIcon,
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'constants/icon';

const getIcon = (name: string) => {
  switch (name) {
    case 'facebook':
      return FacebookIcon;
    case 'github':
      return GithubIcon;
    case 'twitter':
      return TwitterIcon;
    case 'linkedin':
      return LinkedinIcon;
    default:
      throw new Error('Unknown icon name');
  }
};

interface SocialIconProps {
  name: string;
  url: string;
}

export default function SocialIcon({ url, name, ...props }: SocialIconProps) {
  const icon = getIcon(name);
  return (
    <li className="w-9 h-9 grid place-content-center border-2 rounded-full">
      <a href={url} target="_blank" rel="noopener noreferrer" {...props}>
        <svg viewBox={icon.viewBox} className="w-4 h-4 dark:fill-gray-50">
          <title>{name}</title>
          <path d={icon.path} />
        </svg>
      </a>
    </li>
  );
}
