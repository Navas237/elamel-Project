import React, { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useCatagory } from '../../../hooks/useCatagory';
import { useProduct } from '../../../hooks/useProduct';
import { IconHome, IconArrowLeft } from '../../../lib/icons';
import { motion, AnimatePresence } from 'framer-motion';

const Breadcrumbs = () => {
    const location = useLocation();
    const { level, level2, id, categorySlug, subCategorySlug } = useParams();
    const { data: categories } = useCatagory();
    const { data: product } = useProduct(id);

    const breadcrumbs = useMemo(() => {
        const path = location.pathname;
        const searchParams = new URLSearchParams(location.search);
        const type = searchParams.get('ty');

        if (path === '/') return [];

        const crumbs = [
            {
                label: 'الرئيسية',
                path: '/',
                icon: <IconHome size={14} />
            }
        ];

        // Handle Single Product Page
        if (path.startsWith('/singleprodeuct/')) {
            if (product) {
                crumbs.push({
                    label: product.name,
                    path: path,
                    active: true
                });
            }
            return crumbs;
        }

        // Handle Tools (Lifestyle) Pages
        if (path.startsWith('/t')) {
            crumbs.push({
                label: 'الأدوات',
                path: '/t',
                active: path === '/t'
            });

            if (categorySlug) {
                const currentCategory = categories?.find(cat => cat.slug === categorySlug);
                if (currentCategory) {
                    // If we have category slug but no subcategory, we link to category first
                    crumbs.push({
                        label: currentCategory.name,
                        path: `/t/${categorySlug}/${subCategorySlug || ''}`,
                        active: !subCategorySlug || path === `/t/${categorySlug}/${subCategorySlug}`
                    });

                    if (subCategorySlug) {
                        const currentGrade = currentCategory.grades?.find(g => g.slug === subCategorySlug);
                        if (currentGrade) {
                            crumbs.push({
                                label: currentGrade.name,
                                path: `/t/${categorySlug}/${subCategorySlug}`,
                                active: true
                            });
                        }
                    }
                }
            }
        }

        // Handle SF (Category/Grade/Action) Pages
        // Path structure: /sf/:level (category) / [b|choice|selectlang] / :level2 (grade)
        if (path.startsWith('/sf/')) {
            const currentCategory = categories?.find(cat => cat.slug === level);

            if (currentCategory) {
                // 1. Add Category
                crumbs.push({
                    label: currentCategory.name,
                    path: `/sf/${level}`,
                    active: path === `/sf/${level}`
                });

                // 2. Add Grade (level2 is the grade slug in these routes)
                if (level2) {
                    const currentGrade = currentCategory.grades?.find(g => g.slug === level2);
                    if (currentGrade) {
                        const isGradeActive = (path.includes('/choice/') || (path === `/sf/${level}/b/${level2}` && !type));

                        crumbs.push({
                            label: currentGrade.name,
                            path: level2 === '3' ? `/sf/${level}/choice/${level2}` : `/sf/${level}/b/${level2}`,
                            active: isGradeActive
                        });

                        // 3. Add Specific Action (Choice, Lang, or Type from query param)
                        if (path.includes('/selectlang/')) {
                            crumbs.push({
                                label: 'اختيار اللغة',
                                path: path,
                                active: true
                            });
                        } else if (type === 'exam') {
                            crumbs.push({
                                label: 'شرح وأسئلة',
                                path: `${path}?ty=exam`,
                                active: true
                            });
                        } else if (type === 'rev') {
                            crumbs.push({
                                label: 'مراجعة نهائية',
                                path: `${path}?ty=rev`,
                                active: true
                            });
                        }
                    }
                }
            }
        }

        // Handle Other Pages
        const staticPages = {
            '/cart': 'سلة المشتريات',
            '/confirmorder': 'تأكيد الطلب',
            '/myorder': 'طلباتي'
        };

        if (staticPages[path]) {
            crumbs.push({
                label: staticPages[path],
                path: path,
                active: true
            });
        }

        return crumbs;
    }, [location.pathname, location.search, level, level2, id, categorySlug, subCategorySlug, categories, product]);

    if (breadcrumbs.length <= 1) return null;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-1.5 px-4 pt-8 md:px-6 mb-2 overflow-x-auto no-scrollbar sticky top-[160px] md:top-[160px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100/50"
            dir="rtl"
        >
            <div className="max-w-6xl mx-auto flex items-center gap-1.5 whitespace-nowrap">
                <AnimatePresence mode='popLayout'>
                    {breadcrumbs.map((crumb, index) => (
                        <motion.div
                            key={crumb.path}
                            className="flex items-center gap-1.5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {index > 0 && (
                                <motion.span
                                    initial={{ opacity: 0, x: 5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-gray-300 flex-shrink-0"
                                >
                                    <IconArrowLeft size={12} />
                                </motion.span>
                            )}
                            <Link
                                to={crumb.path}
                                className={`
                                    flex items-center gap-1.5 py-1 px-2 rounded-lg transition-all duration-300 group relative
                                    ${crumb.active
                                        ? 'text-[var(--teal-700)] bg-teal-50/50 font-extrabold'
                                        : 'text-gray-500 hover:text-[var(--teal-600)] hover:bg-white active:scale-95'
                                    }
                                `}
                            >
                                {crumb.icon && (
                                    <span className={`transition-transform duration-300 ${!crumb.active && 'group-hover:scale-110'}`}>
                                        {crumb.icon}
                                    </span>
                                )}
                                <span className={`text-[11px] ${crumb.active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                                    {crumb.label}
                                </span>

                                {crumb.active && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--teal-600)]"
                                    />
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Breadcrumbs;
