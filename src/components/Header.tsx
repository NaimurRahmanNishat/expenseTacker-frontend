import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { User, UserCheck, LogOut } from "lucide-react";
import { logout } from "../redux/features/auth/authSlice";

const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Add Expense", href: "/dashboard/add-expense" },
    { label: "All Expense", href: "/dashboard/all-expense" },
];

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        dispatch(logout());
        alert("Logout successful");
        localStorage.removeItem("user");
        setIsDropdownOpen(false);
        navigate("/login");
    };

    if (!mounted) return null;

    return (
        <div className="border-b w-full py-4 relative">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="font-bold text-2xl text-pink-500">
                    Expense<span className="text-green-600">Tracker</span>
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <button onClick={handleClick} title="Account Menu">
                                <UserCheck className="w-8 h-8 text-green-600 cursor-pointer" />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute top-12 w-48 right-0 bg-gray-200 p-2 rounded-lg shadow-lg z-50">
                                    {/* User Info */}
                                    <div className="flex flex-col items-center gap-2 border-b-2 border-gray-400 w-full pb-2">
                                        <p className="font-semibold text-center">{user.username}</p>
                                    </div>

                                    {/* Nav Items */}
                                    <div className="py-2 border-b-2 border-gray-400">
                                        <nav className="space-y-1">
                                            {navItems.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    to={item.href}
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className={`block p-2 rounded-lg transition-colors hover:bg-gray-300`}>
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>

                                    {/* Logout */}
                                    <div className="flex flex-col items-center gap-2 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-1 cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" title="Login">
                            <User className="w-8 h-8 text-gray-700" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;