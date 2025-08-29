// 等待整个网页的HTML内容都加载完毕后，再执行我们的代码
document.addEventListener('DOMContentLoaded', function() {

    // --- 平滑滚动导航逻辑 ---
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // 1. 阻止链接的默认跳转行为
            event.preventDefault(); 
            
            // 2. 获取链接的目标ID (例如 "#about")
            const targetId = this.getAttribute('href');
            
            // 3. 在页面上找到对应的区块元素
            const targetSection = document.querySelector(targetId);

            // 4. 如果找到了，就平滑地滚动到那里
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // 将区块的顶部与视口的顶部对齐
                });
            }
        });
    });


    // --- 项目卡片高级悬停效果逻辑 (保持不变) ---
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.classList.remove('zoomed');
    });

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            setTimeout(() => {
                this.classList.add('zoomed');

                const viewportHeight = window.innerHeight;
                const image = this.querySelector('.project-image');
                if (!image) return;
                const imageRect = image.getBoundingClientRect();
                const imageCenterAbsolute = window.scrollY + imageRect.top + (imageRect.height / 2);
                const focusPoint = viewportHeight * 0.6; 
                const targetScrollY = imageCenterAbsolute - focusPoint;
                
                window.scrollTo({
                    top: targetScrollY,
                    behavior: 'smooth'
                });
            }, 50);
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('zoomed');
        });
    });
});