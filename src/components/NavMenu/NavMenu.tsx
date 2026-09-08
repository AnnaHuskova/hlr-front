import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import { List, MenuItem, Typography } from '@mui/material';
import { ReactComponent as BurgerIcon } from '../../assets/isons/burger_icon.svg';
import { ReactComponent as CloseIcon } from '../../assets/isons/X_icon.svg';
import { useTranslation } from 'react-i18next';


type RouteType = {
	path: string;
	translationKey: string;
}

const routes: RouteType[] = [
 //  {
	// 	path: '/save',
	// 	displayText: 'Як захистити?'
	// },
	{
		path: '/',
		translationKey: 'nav.map',
	},
  {
		path: '/about',
		translationKey: 'nav.aboutProject',
	},
	// {
	// 	path: '/blog',
	// 	displayText: 'Blog'
	// }
];

const NavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const activeStyles =
    // underline for mobile
    "relative text-navlinkActive " +
    // underline for desktop
    "lg:after:content-[''] lg:after:absolute lg:after:left-0 lg:after:bottom-[-1rem] lg:after:block lg:after:w-full lg:after:h-1 lg:after:bg-accent";
   useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);
  return (
    <div className="relative flex items-center justify-center h-full">
      {/*burger_btn */}
      <button
        className="block lg:hidden mx-2 my-1 flex items-center justify-center w-10 h-10"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
      {menuOpen ? (
          <CloseIcon className="w-8 h-8" />
        ) : (
          <BurgerIcon className="w-8 h-8" />
        )}
      </button>

      {/* desktop_nav */}
      <nav className="hidden lg:flex flex-row text-navlink">
        {routes.map((route) => (
          <NavLink
            end
            to={route.path}
            key={route.path}
            className={({ isActive }) =>
              `block h-full pt-4 mx-13 text-center ${
                isActive ? activeStyles : ''
              }`
            }
          >
            <span className="px-8 text-center">{t(route.translationKey)}</span>
          </NavLink>
        ))}
      </nav>

      {/* addaptive_dropp-menu */}
      {menuOpen && (
        <nav className="fixed lg:hidden top-12 left-0 w-full bg-white shadow-lg flex flex-col items-center text-navlink z-50 py-4">
			{routes.map((route) => (
			<NavLink
				end
				to={route.path}
				key={route.path}
				onClick={() => setMenuOpen(false)}
				className={({ isActive }) =>
				`block py-3 w-full text-center hover:bg-gray-100 ${
					isActive ? activeStyles : ''
				}`
				}
			>
				{t(route.translationKey)}
			</NavLink>
    ))}
  		</nav>
      )}
      
    </div>
  );
};

export { NavMenu };

