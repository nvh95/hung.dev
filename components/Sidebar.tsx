import Image from 'next/image';
import SocialIcon from './SocialIcon';
import clsx from 'clsx';

interface SidebarProps {
  isMobile?: boolean;
}
function Sidebar({ isMobile = false }: SidebarProps) {
  return (
    <div
      className={clsx(
        'flex-col self-start sticky top-10 pr-10',
        isMobile ? 'flex' : 'md:flex hidden',
      )}
    >
      <Image
        className="shrink-0 rounded-full"
        src="/photo.gif"
        alt="avatar"
        layout="fixed"
        width={75}
        height={75}
      />
      <h1 className="font-bold text-lg py-4">Hung.Dev</h1>
      <p className="pb-4 text-gray-600 dark:text-gray-400">
        Software Engineer. Amateur Triathlete
      </p>

      <nav>
        <ul className="flex flex-col gap-3 py-4">
          <li>Blogs</li>
          <li>About me</li>
          <li>Contact me</li>
          <li>Wordpress Blog</li>
        </ul>
      </nav>
      <ul className="flex gap-2 py-4">
        <SocialIcon name="twitter" url="https://www.twitter.com/hung_dev" />
        <SocialIcon name="github" url="https://github.com/nvh95" />
        <SocialIcon name="linkedin" url="https://www.linkedin.com/in/nvh95" />
        <SocialIcon name="facebook" url="https://www.facebook.com/nvh95" />
      </ul>
    </div>
  );
}

export default Sidebar;
