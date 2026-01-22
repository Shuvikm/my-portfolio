import StaggeredMenu from '../ui/StaggeredMenu';

export default function Navigation() {
  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/Shuvikm' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/shuvikm/' },
    { label: 'LeetCode', link: 'https://leetcode.com/u/Shuvik_M/' },
    { label: 'Email', link: 'mailto:mshuvik@gmail.com' }
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', pointerEvents: 'none', zIndex: 50 }}>
      <StaggeredMenu
        position="right"
        socialItems={socialItems}
        displaySocials
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        colors={['#fbbf24', '#1a1a1a']}
        logoUrl="/images/profile.jpg"
        accentColor="#fbbf24"
        isFixed={false}
        closeOnClickAway={true}
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />
    </div>
  );
}
