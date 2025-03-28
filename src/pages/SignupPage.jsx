import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { supabase } from '../utils/supabaseClient.js';
import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL;

const SignupPage = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

        useEffect(() => {
            setLoading(true)
            const checkUser = async () => {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    navigate('/'); 
                }
                setLoading(false)
    
            };
            checkUser();
        }, [navigate]);


    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });
    
            if (error) throw error
    
            await axios.post(`${API}/auth/signup`, {
                name: formData.fullName,
                email: formData.email,
            });
    
    
            console.log('Signup form submitted:', formData);
           navigate("/")
        } catch (err) {
            console.error("Signup error:", err.message);
            alert("Signup failed! Please try again.");
        }
    };
    
    if (loading) return <p>Loading.....</p>

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-form-container">
                    <div className="auth-header">
                        <h1>Create an Account</h1>
                        <p>Join Rentora to find your perfect home</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <div className="input-with-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4s-4,1.79-4,4S9.79,12,12,12z M12,14c-2.67,0-8,1.34-8,4v2h16v-2C20,15.34,14.67,14,12,14z" fill="#718096"></path>
                                </svg>
                                <input 
                                    type="text" 
                                    id="fullName" 
                                    name="fullName" 
                                    value={formData.fullName} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-with-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" fill="#718096"></path>
                                </svg>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-with-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18,8H17V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M15.1,8H8.9V6c0-1.71,1.39-3.1,3.1-3.1s3.1,1.39,3.1,3.1V8z" fill="#718096"></path>
                                </svg>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="Min. 6 characters"
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">
                            Create Account
                        </button>
                    </form>
                    
                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </div>
                
                <div className="auth-image signup-image">
                    <div className="image-overlay"></div>
                    <div className="auth-testimonial">
                        <div className="quote-icon">❝</div>
                        <p className="testimonial-text">
                            As a property owner, Rentora has simplified my rental business. 
                            I found reliable tenants within days of listing!
                        </p>
                        <div className="testimonial-author">
                            <div className="author-avatar owner-avatar"></div>
                            <div className="author-info">
                                <p className="author-name">Michael Chen</p>
                                <p className="author-title">Property Owner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;