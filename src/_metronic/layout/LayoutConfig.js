export default {
    "demo": "demo2",
    "js": {
        "breakpoints": {
            "sm": 576,
            "md": 768,
            "lg": 992,
            "xl": 1200,
            "xxl": 1200
        },
        "colors": {
            "theme": {
                "base": {
                    "white": "#ffffff",
                    "primary": "#6993FF",
                    "secondary": "#E5EAEE",
                    "success": "#1BC5BD",
                    "info": "#8950FC",
                    "warning": "#FFA800",
                    "danger": "#F64E60",
                    "light": "#F3F6F9",
                    "dark": "#212121"
                },
                "light": {
                    "white": "#ffffff",
                    "primary": "#E1E9FF",
                    "secondary": "#ECF0F3",
                    "success": "#C9F7F5",
                    "info": "#EEE5FF",
                    "warning": "#FFF4DE",
                    "danger": "#FFE2E5",
                    "light": "#F3F6F9",
                    "dark": "#D6D6E0"
                },
                "inverse": {
                    "white": "#ffffff",
                    "primary": "#ffffff",
                    "secondary": "#212121",
                    "success": "#ffffff",
                    "info": "#ffffff",
                    "warning": "#ffffff",
                    "danger": "#ffffff",
                    "light": "#464E5F",
                    "dark": "#ffffff"
                }
            },
            "gray": {
                "gray100": "#F3F6F9",
                "gray200": "#ECF0F3",
                "gray300": "#E5EAEE",
                "gray400": "#D6D6E0",
                "gray500": "#B5B5C3",
                "gray600": "#80808F",
                "gray700": "#464E5F",
                "gray800": "#1B283F",
                "gray900": "#212121"
            }
        },
        "fontFamily": "Poppins"
    },
    "self": {
        "layout": "default",
        "body": {
            "backgroundImage": "bg/bg-10.jpg"
        }
    },
    "loader": {
        "enabled": true,
        "type": "",
        "logo": "/metronic/react/demo2/media/logos/logo-dark-sm.png",
        "message": "Please wait..."
    },
    "header": {
        "self": {
            "width": "fluid",
            "fixed": {
                "desktop": true,
                "mobile": false
            }
        },
        "menu": {
            "self": {
                "display": true,
                "layout": "default",
                "root-arrow": false,
                "icon-style": "duotone"
            },
            "desktop": {
                "arrow": true,
                "toggle": "click",
                "submenu": {
                    "theme": "light",
                    "arrow": true
                }
            },
            "mobile": {
                "submenu": {
                    "theme": "dark",
                    "accordion": true
                }
            }
        }
    },
    "subheader": {
        "display": true,
        "displayDesc": false,
        "displayDaterangepicker": true,
        "breadcrumb": {
            "display": true
        },
        "layout": "subheader-v6",
        "fixed": false,
        "width": "fluid",
        "clear": false,
        "style": "transparent"
    },
    "content": {
        "width": "fluid"
    },
    "aside": {
        "self": {
            "display": false
        },
        "menu": {
            "dropdown": false,
            "scroll": false,
            "icon-style": "duotone",
            "submenu": {
                "accordion": true,
                "dropdown": {
                    "arrow": true,
                    "hover-timeout": 500
                }
            }
        }
    },
    "footer": {
        "width": "fixed",
        "layout": "compact"
    },
    "extras": {
        "search": {
            "display": false,
            "layout": "dropdown",
            "offcanvas": {
                "direction": "right"
            }
        },
        "notifications": {
            "display": false,
            "layout": "dropdown",
            "dropdown": {
                "style": "dark"
            },
            "offcanvas": {
                "direction": "right"
            }
        },
        "quick-actions": {
            "display": false,
            "layout": "dropdown",
            "dropdown": {
                "style": "dark"
            },
            "offcanvas": {
                "direction": "right"
            }
        },
        "cart": {
            "display": false,
            "layout": "dropdown",
            "offcanvas": {
                "direction": "dark"
            }
        },
        "chat": {
            "display": false
        },
        "user": {
            "display": true,
            "layout": "dropdown",
            "dropdown": {
                "style": "light"
            },
            "offcanvas": {
                "direction": "right"
            }
        },
        "languages": {
            "display": true
        },
        "quick-panel": {
            "display": false,
            "offcanvas": {
                "direction": "right"
            }
        },
        "toolbar": {
            "display": false
        },
        "scrolltop": {
            "display": true
        }
    }
}