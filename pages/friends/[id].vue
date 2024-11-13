
<template>
    <div class="register-page">
        
        <div v-show="showLoginModal" class="modal" @click.self="closeLoginModal">
          <div class="modal-content">
            <span class="close" @click="closeLoginModal">&times;</span>
            <h2 style="text-align: center;
        color: white;
        padding: 20px;
        background: #75C2FA;
        margin: 0;">Login</h2>
            <div class="modal-body" style=" text-align: center;   padding: 20px;
        margin-top: 3rem;
        margin-bottom: 3rem;">
              <UForm @submit="LoginSubmit" :schema="schemaLogin" :state="stateLogin" >
                <UFormGroup label="Username" name="username">
                    <UInput style="background: white; color: black; font-size: 2rem;" v-model="stateLogin.username" type="text" placeholder="Enter username" />
                </UFormGroup>
                <UFormGroup label="Password" name="password">
                    <UInput style="background: white; color: black; font-size: 2rem;" v-model="stateLogin.password" type="password" placeholder="Enter password" />
                </UFormGroup>
                <div style="margin-top: 2rem;">
                  <button @click="toggleForgetPasswordModal" type="button" style="background: white; font-size: 1rem; color: black; border: 1px black solid; padding: 1.5rem;">FORGOT PASSWORD?</button>
                </div>
                <div style="margin-top: 2rem;">
                    <UButton type="submit" style="background: lime; padding: 2rem; border-radius: 2rem;">
                        AUTHORIZE
                    </UButton>
                </div>
              </UForm>
            </div>
          </div>
        </div>
    
        <div v-show="showForgetPasswordModal"  class="modal" style="z-index: 9999999;" @click.self="closeForgetPasswordModal">
          <div style="background: linear-gradient(180deg, #62F0E8 0%, #50BEB7 60%, #2F8781 100%);max-width: 1000px; " class="modal-content">
            <span class="close" @click="closeForgetPasswordModal">&times;</span>
            <div class="modal-body" style="  align-items: center; text-align: center; justify-content: center;  padding: 20px;
        margin-top: 3rem;
        margin-bottom: 3rem;">
                <div style=" display: flex;     flex-direction: column; align-items: center; text-align: center; justify-content: center; ">
                    <div style="background: white; padding: 2rem; width: 400px;">
                    To get access to your account do next steps
                  </div>
                </div>
    
                <div style="display: flex; margin-top: 2rem;">
                  <div style="width: 50%; color: white; font-size: 1.5rem;">Write your email</div>
                  <div style="width: 50%; font-size: 1.5rem;">
                    <input type="text" name="email" id="emailForgetInput">
                  </div>
                </div>
    
              <div style="display: flex; margin-top: 2rem;">
                <div style="width: 50%; color: white; font-size: 1.5rem;">Send code to email</div>
                <div style="width: 50%; font-size: 1.5rem;"><button @click="sendForgetPasswordToEmail" :disabled="isLoadingForgetPassword" style="background: #D6E343; color: black; padding: 1rem;
    ">{{ isLoadingForgetPassword ? 'Loading...' : 'Send' }}</button></div>
              </div>
    
              <div style="display: flex; margin-top: 2rem;">
                <div style="width: 50%; color: white; font-size: 1.5rem;">ENTER THE SECRET PHRASE</div>
                <div style="width: 50%; font-size: 1.5rem;"><input ref="secretPhraseInput" id="secretPhraseForgetPasswordInput" name="secret_phrase" type="password" placeholder="******" style="background: #44B3D6; color: white;
    "></div>
    </div>
              <div style="display: flex; margin-top: 2rem;">
                <div style="width: 50%; color: white; font-size: 1.5rem;">ENTER THE NEW PASSWORD</div>
                <div style="width: 50%; font-size: 1.5rem;"><input ref="secretPhraseInput" id="newPasswordInputForget" name="password" type="password" placeholder="******" style="background: #44B3D6; color: white;
    "></div>
              </div>
              <div style="display: flex;     flex-direction: column; align-items: center; text-align: center; justify-content: center; margin-top: 2rem;">
                    <button @click="changePasswordForget" :disabled="isLoadingForgetChangePassword" style="background: #44B3D6; padding: 1rem; color:white;
    ">{{ isLoadingForgetChangePassword ? 'Loading...' : 'Change password' }}</button>
                </div>
            </div>
          </div>
        </div>
        <header style="background: #FFFFFFBD;  padding: 1rem;">
            <div class="header" style="display:flex; justify-content: space-between;">
                <NuxtLink to="/" class="" style="border:none; background: none; cursor: pointer;">
                    <img src="/static/burger.png" style="width: 50px; height:50px;">
                </NuxtLink>
                <div class="" style="background: linear-gradient(90deg, #E5F67C 0%, #ECEF64 33%, #D2E037 66%, #EAEE3A 100%);padding: 1rem 16rem; border-radius: 5%;">
                    <div class="" style="background: linear-gradient(90deg, #FFADAD 0%, #FF774C 100%);
                -webkit-background-clip: text;
                color: transparent; font-weight: 700; font-size: larger;">
                        New trips on Fall season! Full details on our Instagram accounts.
                    </div>
                </div>
                <div v-if="!isAuth" @click="toggleDropdownAuth"  ref="dropdownAuth" style="position: relative; cursor: pointer; background: #7EEFFF; padding: 0.5rem 1rem; border-radius: 50%; border: none;">
                    <div class="dropdown-toggle" :class="{ open: isOpenAuth }" style="    background: none;">
                    <img src="/static/img/avatar.png" style="width: 30px; height:30px;">
                    </div>
    
                    <ul v-if="isOpenAuth" class="dropdown-menu" style="width: 200px;left: -100px;">
                    <li @click="toggleLoginModal">Login</li>
                    <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" to="/register">Register </NuxtLink></li>
                    </ul>
                </div>
    
                <div v-if="isAuth" @click="toggleDropdownAuth"  ref="dropdownAuth" style="position: relative; cursor: pointer; background: #7EEFFF; padding: 0.5rem 1rem; border-radius: 50%; border: none;">
                    <div class="dropdown-toggle" :class="{ open: isOpenAuth }" style="    background: none;">
                    <img src="/static/img/avatar.png" style="width: 30px; height:30px;">
                    </div>
    
                    <ul v-if="isOpenAuth" class="dropdown-menu" style="width: 200px;left: -100px;">
                    <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" :to="`/profile/${authUserId}`">My profile </NuxtLink></li>
                    <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" to="/favorites">Favorites </NuxtLink></li>
                    <li @click="logout">Logout</li>
                    </ul>
                </div>
            </div>
        </header>
    
    
    
        <div style="padding: 2rem;">
            <h1 class="page-title">{{ userId == authUserId ? 'My friends' : 'Friends' }}</h1>

            <!-- Friends List -->
            <div v-if="friends" class="friends-list">
            <div class="friend-card" v-for="friend in friends" :key="friend.id">
                <img :src="friend.avatar" alt="Friend Avatar" class="friend-avatar" />

                <div class="friend-info">
                <a :href="`/profile/${friend.id}`" class="friend-name">{{ friend.username }}</a>
                <p class="friend-activity">
                    Activity: {{ formatDistanceToNow(new Date(friend.last_activity), { addSuffix: true }) || 'Just now' }}
                </p>
                </div>

                <!-- Buttons and Rename Input -->
                <div class="friend-actions">
                <button v-if="userId == authUserId" @click="followUser(friend.id)" class="unfollow-btn">Unfollow</button>
                
                <!-- Rename button/input -->
                <div v-if="friend.renameMode" class="rename-container">
                    <input 
                    v-model="friend.newName" 
                    class="rename-input" 
                    :placeholder="friend.username" 
                    type="text" 
                    />
                    <button @click="saveNewName(friend)" class="save-btn">Save</button>
                </div>
                <button v-else @click="startRename(friend)" class="rename-btn">Rename</button>
                
                <button class="chat-btn">Chat</button>
                </div>
            </div>
            </div>
            <div v-else class="loading">
            <p style="font-size: 1.5rem; color: #888;">Loading friends...</p>
            </div>
        </div>
    
    </div>
    </template>
    <script setup lang="ts">
    import { object, string, number, type InferType } from 'yup'
    import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'
    import { showLoginModal, toggleLoginModal, closeLoginModal } from '~/scripts/loginModal'
    import { isAuth, authUserId, authJwtToken, trueIsAuth, toggleIsAuth, changeIsAuth, falseIsAuth, authUserIdChange, authJwtTokenChange, logout, showForgetPasswordModal, toggleForgetPasswordModal, closeForgetPasswordModal, isLoadingForgetPassword, sendForgetPasswordToEmail, isLoadingForgetChangePassword, changePasswordForget, SendLastActivity } from '~/scripts/auth'
    import { ref as refVue, computed } from 'vue'

    
    const schemaLogin = object({
        username: string().required('Username is required').max(255, 'Maximum 255 characters'),
        password: string()
        .min(8, 'Must be at least 8 characters')
        .required('Password is required')
    })
    
    type SchemaLoginType = InferType<typeof schemaLogin>
    
    const stateLogin = reactive({
        username: undefined,
        password: undefined
    })
    
    export interface Friend {
    id: number;
    username: string;
    avatar: string;
    last_activity: string;
    renameMode?: boolean;
    newName?: string;  
    }
    
    const schemaUser = object({
        username: string().required('Username is required').max(255, 'Maximum 255 characters'),
        age: number().required().positive().integer(),
        location: string().nullable(),
    })

    const route = useRoute();
    const friends = ref<Friend[] | null>(null);

    // Function to fetch friends from the API
    async function fetchFriends(userId: string): Promise<void>  {
        try {
            const response = await fetch(`/api/friends/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}) // Your request body here, if required
            });
            if (response.ok) {
                const data = await response.json();
                friends.value = data.followedUsers.map((friend: Friend) => ({
                    ...friend,
                    renameMode: false,
                    newName: friend.username
                })) as Friend[];
            } else {
                console.error("Failed to fetch friends.");
            }
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    }

    const userId = route.params.id || '0';

    onMounted(() => {
        fetchFriends(userId);
    });


    async function followUser(friendId: any) {
        try {
            const token = authJwtToken ?? localStorage.getItem('jwtToken');
            if (!token) {
                alert('Authentication token is missing.');
                return;
            }

            const response = await fetch('/api/followuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authJwtToken.value,
                },
                body: JSON.stringify({user_id: friendId}),
            });

            const result = await response.json();
            if (result.success) {
                alert(result.message);
                fetchFriends(userId);
            } else {
                alert('Failed to following.');
            }
        } catch (error) {
            console.error('Error following :', error);
            alert('An error occurred while following ');
        }
    }

    // Start rename mode for a specific friend
    function startRename(friend: Friend) {
    friend.renameMode = true;
    }

    // Save the new name for a friend
    async function saveNewName(friend: Friend) {
    if (!friend.newName || friend.newName === friend.username) {
        friend.renameMode = false;
        return; // No change made
    }

    try {
        const response = await fetch(`/api/updateUsername`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authJwtToken.value,
        },
        body: JSON.stringify({ user_id: friend.id, new_username: friend.newName })
        });

        const result = await response.json();
        if (result.success) {
        friend.username = friend.newName; // Update the displayed name
        friend.renameMode = false; // Exit rename mode
        } else {
        console.error('Failed to update name:', result.message);
        }
    } catch (error) {
        console.error('Error updating name:', error);
    }
    }
    </script>
    
    <script lang="ts">
    import _ from 'lodash';
    import { format, formatDistanceToNowStrict, isToday, formatDistanceToNow, sub, isSameDay, type Duration  } from 'date-fns';

    interface User {
      id: number;
      activated: boolean;
      email: string;
      username: string;
      age: string;
      location: string;
      last_activity: string;
      rating: string;
    }
    
    interface Person {
        id: number;
        PersonName: string;
        Avatar: string;
        PubDate: string;
        Rating: number;
        Commentary: string;
        Topic: string;
        Stars: number;
    }
    
    export default {
        name: 'HelloWorld',
        props: {
        msg: String
        },
        data() {
        return {
            followedUsers: [],
            persons: [
            { id: 1, PersonName: 'Vladimir', Avatar: '/static/img/avatar.png', PubDate: '2024-09-13', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 2, PersonName: 'Marlen', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 3, PersonName: 'JackJones', Avatar: '/static/img/avatar.png', PubDate: '2024-09-11', Rating: 1, Commentary: 'Great product! Very Bad no way  no buying that s not good !', Topic: 'IT', Stars: 0 },
            { id: 4, PersonName: 'Michael', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 5, PersonName: 'Jaseh', Avatar: '/static/img/avatar.png', PubDate: '2024-09-16', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 6, PersonName: 'Onfroy', Avatar: '/static/img/avatar.png', PubDate: '2024-09-14', Rating: 4, Commentary: 'Great product!', Topic: 'AI', Stars: 0 },
            { id: 7, PersonName: 'Billie', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 2, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 8, PersonName: 'Henry', Avatar: '/static/img/avatar.png', PubDate: '2024-09-18', Rating: 2, Commentary: 'Great product!', Topic: 'VR', Stars: 0 },
            { id: 9, PersonName: 'Shahboz', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 1, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 10, PersonName: 'Nikolai', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 11, PersonName: 'Tima', Avatar: '/static/img/avatar.png', PubDate: '2024-09-11', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 12, PersonName: 'Timur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 13, PersonName: 'Temirlan', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 14, PersonName: 'Serafim', Avatar: '/static/img/avatar.png', PubDate: '2024-08-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 15, PersonName: 'Steven', Avatar: '/static/img/avatar.png', PubDate: '2024-09-13', Rating: 2, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 16, PersonName: 'Maks', Avatar: '/static/img/avatar.png', PubDate: '2024-09-14', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 17, PersonName: 'Akniet', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 1, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 18, PersonName: 'Baur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 19, PersonName: 'Ainur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 20, PersonName: 'Hawkin', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            ] as Person[],
            filteredPersons: [
            { id: 1, PersonName: 'Vladimir', Avatar: '/static/img/avatar.png', PubDate: '2024-09-13', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 2, PersonName: 'Marlen', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 3, PersonName: 'JackJones', Avatar: '/static/img/avatar.png', PubDate: '2024-09-11', Rating: 1, Commentary: 'Great product! Very Bad no way  no buying that s not good !', Topic: 'IT', Stars: 0 },
            { id: 4, PersonName: 'Michael', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 5, PersonName: 'Jaseh', Avatar: '/static/img/avatar.png', PubDate: '2024-09-16', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 6, PersonName: 'Onfroy', Avatar: '/static/img/avatar.png', PubDate: '2024-09-14', Rating: 4, Commentary: 'Great product!', Topic: 'AI', Stars: 0 },
            { id: 7, PersonName: 'Billie', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 2, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 8, PersonName: 'Henry', Avatar: '/static/img/avatar.png', PubDate: '2024-09-18', Rating: 2, Commentary: 'Great product!', Topic: 'VR', Stars: 0 },
            { id: 9, PersonName: 'Shahboz', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 1, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 10, PersonName: 'Nikolai', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 11, PersonName: 'Tima', Avatar: '/static/img/avatar.png', PubDate: '2024-09-11', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 12, PersonName: 'Timur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 5, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 13, PersonName: 'Temirlan', Avatar: '/static/img/avatar.png', PubDate: '2024-09-12', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 14, PersonName: 'Serafim', Avatar: '/static/img/avatar.png', PubDate: '2024-08-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 15, PersonName: 'Steven', Avatar: '/static/img/avatar.png', PubDate: '2024-09-13', Rating: 2, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 16, PersonName: 'Maks', Avatar: '/static/img/avatar.png', PubDate: '2024-09-14', Rating: 3, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 17, PersonName: 'Akniet', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 1, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 18, PersonName: 'Baur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 19, PersonName: 'Ainur', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            { id: 20, PersonName: 'Hawkin', Avatar: '/static/img/avatar.png', PubDate: '2024-09-15', Rating: 4, Commentary: 'Great product!', Topic: 'IT', Stars: 0 },
            ] as Person[],
            topics: ['IT', 'AI', 'VR'],
            selectedTopic: 'IT',
            currentPage: 1,
            itemsPerPage: 4,
            sortByRating: true,
            isModalOpen: false,
            showModalValidate: false,
            isOpenAuth: false,
            isOpen: false,
            selectedFilter: 'rating',
            options: {
            rating: 'Rating',
            pubDate: 'Publication Date'
            }
        };
        },
        computed: {
        paginatedPersons() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredPersons.slice(startIndex, endIndex);
        },
        selectedLabel() {
            return this.options[this.selectedFilter];
        }
        },
        mounted() {
        this.filteredPersons = this.persons.filter(person => person.Topic === 'IT');
        document.addEventListener('click', this.handleClickOutside);
    
    
        var isAuthValue = localStorage.getItem('isAuth');
        var authJwtTokenValue = localStorage.getItem('jwtToken');
        authUserIdChange(isAuthValue ?? '');
        changeIsAuth(isAuthValue !== null && !isNaN(Number(isAuthValue)));
        authJwtTokenChange(authJwtTokenValue ?? '');
            if (authJwtToken.value !== null && authJwtToken.value !== '') {
                SendLastActivity();
                this.fetchFollowedUsers();
            }
        },
        beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    
        },
        methods: {
        async fetchFollowedUsers() {
            try {
                const token = authJwtToken.value ?? localStorage.getItem('jwtToken');
                if (!token) {
                    console.warn('User is not authenticated.');
                    return;
                }
                const response = await fetch('/api/getfollowedusers', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                });

                const result = await response.json();
                if (result.success) {
                    console.log(result);
                    this.followedUsers = result.followedUsers;
                } else {
                    console.error('Failed to fetch followed users:', result.message);
                }
            } catch (error) {
                console.error('Error fetching followed users:', error);
            }
        },
        async LoginSubmit(event: FormSubmitEvent<SchemaLoginType>) {
            event.preventDefault();
    
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(event.data),
                });
    
                const result = await response.json();
                if (result.success) {
                    alert('Logged successful!');
                    localStorage.setItem('isAuth', result.userId);
                    localStorage.setItem('jwtToken', result.token);
                    trueIsAuth();
                    authUserIdChange(result.userId);
                    authJwtTokenChange(result.token);
                    closeLoginModal();
                } else {
                    alert('Failed to login.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred while submitting the form.');
            }
        },
        filterByRatingOrDate() {
            if (this.selectedFilter == 'pubDate') {
            this.filteredPersons = _.orderBy(this.persons, ['PubDate'], ['desc']);
            
            } else {
            this.filteredPersons = _.orderBy(this.persons, ['Rating'], ['desc']);
            }
    
        },
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        toggleDropdownAuth() {
            this.isOpenAuth = !this.isOpenAuth;
        },
        getStarStyle(rating: any) {
            let startColor;
            if (rating <= 1) {
            startColor = '#ff0000'; // Red
            } else if (rating <= 2) {
            startColor = '#ff6f00'; // Orange
            } else if (rating <= 3) {
            startColor = '#ffb904'; // Orange-yellow
            } else if (rating <= 4) {
            startColor = '#ffe234'; // Almost yellow
            } else {
            startColor = '#ffff00'; // Full yellow
            }
    
            const percentage = (rating * 100) / 5; 
    
            return {
            background: `linear-gradient(90deg, ${startColor} 0%, ${startColor} ${percentage}%, #e4e4e4 ${percentage}%, #e4e4e4 100%)`,
            '-webkit-background-clip': 'text',
            'color': 'transparent',
            };
        },
        handleClickOutside(event: any) {
            const dropdown = this.$refs.dropdown;
            if (dropdown && !dropdown.contains(event.target)) {
            this.isOpen = false;
            }
            const dropdownAuth = this.$refs.dropdownAuth;
            if (dropdownAuth && !dropdownAuth.contains(event.target)) {
            this.isOpenAuth = false;
            }
            
        },
        toggleModal() {
            this.isModalOpen = !this.isModalOpen;
        },
        toggleModalValidate(event: any) {
            event.preventDefault();
            this.showModalValidate = !this.showModalValidate;
        },
        closeModalValidate() {
            this.showModalValidate = false;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        formatDateTime(date: any) {
            if (isToday(date)) {
            return `Today, ${format(date, 'HH:mm')}`;
            } else {
            return `${formatDistanceToNowStrict(date, { addSuffix: true })}, ${format(date, 'HH:mm')}`;
            }
        },
        stars(rating: any) {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 !== 0 ? 1 : 0;
            const emptyStars = 5 - fullStars - halfStar;
    
            return '⭐'.repeat(fullStars) + (halfStar ? '⭐½' : '') + '☆'.repeat(emptyStars);
        },
        incrementStars(person: any) {
            if(person.Rating < 4.9) {
            person.Rating += 0.1;
    
                this.filterByRatingOrDate();
            }
        },
        logCode() {
            console.log('123');
            alert('send successfully!');
        },
        createUser(event: any) {
            const secretPhraseInput = this.$refs.secretPhraseInput as HTMLInputElement;
            const secretPhrase = secretPhraseInput.value;
    
            if (secretPhrase === '123') {
                this.$router.push('/');
            } else {
                alert('Incorrect secret phrase! Please try again.');
            }
        }
        }
    }
    </script>
    
    <style>
    .register-page {
        font-family: Arial, sans-serif;
        background: linear-gradient(180deg, #76C5E7 0%, #FBF3F3 100%);
        min-height: 100vh;
        margin: 0;
        padding: 0;
    }
    </style>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
    .modal {
        display: block; /* Show the modal */
        position: fixed; 
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        background-color: rgba(0,0,0,0.4);
    }
    
    .modal-content {
        background-color: #fff;
        margin: 15% auto;
        border: 1px solid #888;
        width: 80%;
        max-width: 400px;
        border-radius: 8px;
    }
    
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }
    
    .close:hover,
    .close:focus {
        color: black;
    }
    .form-group {
        margin-bottom: 1rem;
    }
    
    .container {
        background-color: white;
        border-radius: 15px;
        width: 80%;
        max-width: 1200px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .date {
        font-size: 2em;
        color: #4b9cd3;
    }
    .filter {
        background: #EEFCF7;
        font-size: 2rem;
        font-weight: 900;
        color: #a6e168;
        cursor: pointer;
        padding: 0rem 1rem;
    }
    
    .dropdown-toggle {
        background: #EEFCF7;
        font-size: 2rem;
        font-weight: 900;
        color: #a6e168;
        padding: 0rem 1rem;
        display: flex;
        align-items: center;
        border: none;
        border-radius: 0.5rem;
    }
    
    .dropdown-toggle.open {
        background-color: #d1f2eb; 
    }
    
    .dropdown-menu {
        position: absolute;
        top: 3rem; 
        left: 0;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .dropdown-menu li {
        padding: 1rem;
        font-size: 1.8rem;
        font-weight: 900;
        color: #555;
        cursor: pointer;
        background-color: #EEFCF7;
    }
    
    .dropdown-menu li:hover {
        background-color: #d1f2eb;
        color: #333;
    }
    .reviews {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .review-card {
        background: #5BB9CD;
        border-radius: 10px;
        width: 45%;
        margin: 10px 0;
        padding: 20px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        color: white;
    }
    .review-card img {
        border-radius: 50%;
        margin-right: 20px;
    }
    .review-details {
        flex-grow: 1;
    }
    .review-details p {
        margin: 5px 0;
    }
    .rating {
        color: #ffcc00;
    }
    .stars {
        font-size: 1.5em;
        letter-spacing: 6px;
        background: -webkit-gradient(linear, left top, right top, color-stop(0, #ffb904), color-stop(55%, #ffb904), color-stop(0, #e4e4e4), to(#e4e4e4));
        background: linear-gradient(90deg, #ffb904 0, #ffb904 55%, #e4e4e4 0, #e4e4e4 100%);
        -webkit-background-clip: text;
        color: transparent;
        line-height: 1;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .like-button {
        background-color: #a6e168;
        padding: 10px;
        border: none;
        border-radius: 10px;
        color: white;
        cursor: pointer;
    }
    
    .hexagon-div {
        width: 1200px;
        height: 1000px;
        background: linear-gradient(180deg, #FEFEFE 0%, #CED2D2 40%, #C1C5C5 62%, #B8BBBB 100%);
        clip-path: polygon(50% 10%, 100% 15%, 100% 85%, 50% 80%, 0% 85%, 0% 15%);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
    }
    
    .border-blue {
        background: #5BB9CD; color: white; padding: 0rem 1rem; width: 200px; border-radius: 8px;
    }

    .statistic-page {
  font-family: Arial, sans-serif;
  background-color: #e0f7fc;
  color: #4c648e;
  padding: 20px;
}
h1 {
  text-align: center;
  font-size: 2rem;
}
.chart-container {
  margin: 20px auto;
  width: 80%;
}
.date-picker {
  display: flex;
  justify-content: end;
  align-items: end;
  margin-top: 20px;
}
.selected-date {
  margin-left: 10px;
  font-size: 1.2rem;
  color: #4c648e;
}
    .drawer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        align-items: center;
        z-index: 99999;
    }
    
    .drawer-content {
        background-color: white;
        padding: 20px;
        width: 300px;
        height: 100vh;
        text-align: center;
    }
    
    .drawer ul {
        list-style: none;
        padding: 0;
    }
    
    .drawer ul li {
        cursor: pointer;
        margin: 10px 0;
        color: #007BFF;
    }
    
    .drawer ul li:hover {
        text-decoration: underline;
    }
    
    .posts-section {
      padding: 20px;
      text-align: center;
    }
    
    h2 {
      margin-bottom: 20px;
    }
    
    .posts-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .post-card {
      background-color: #66c9ff;
      border-radius: 20px;
      padding: 20px;
      width: 300px;
      margin: 10px;
      position: relative;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .post-header h3 {
      font-size: 1.5rem;
      color: white;
    }
    
    .rating {
      display: flex;
    }
    
    .star {
      color: yellow;
    }
    
    .post-info {
      font-size: 0.9rem;
      margin: 10px 0;
      color: white;
    }
    
    .post-text {
      font-size: 1rem;
      margin: 10px 0;
      color: white;
    }
    
    .post-avatar {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
    
    .post-avatar img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    
    .delete-button {
      background-color: red;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      position: absolute;
      bottom: 10px;
      left: 10px;
    }
    
    .pagination-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
    
    .pagination-controls button {
      background-color: #66c9ff;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      margin: 0 10px;
    }
    
    .pagination-controls span {
      font-size: 1.2rem;
    }

    .back-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100px; /* Adjust the width */
        height: 90px; /* Adjust the height */
        background-color: rgba(173, 216, 230, 0.5); /* Light blue with some transparency */
        border-radius: 50px; /* Makes it oval */
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .back-button:hover {
        background-color: rgba(173, 216, 230, 0.7); /* Darker on hover */
    }

    .back-button .arrow {
        font-size: 60px;
        color: white;
    }

    .friends-page {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(to bottom, #b3e5fc, #ffffff);
}

/* Notification bar styling */
.notification-bar {
  background-color: #fef0a1;
  color: #8a2d06;
  font-weight: bold;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

/* Page title styling */
.page-title {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
}

/* Friends list container styling */
.friends-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Individual friend card styling */
.friend-card {
  display: flex;
  align-items: center;
  background-color: #e0f7fa;
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
}

/* Avatar image styling */
.friend-avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 1rem;
}
.friend-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.friend-info {
  display: flex;
  flex-direction: column;
}

.friend-actions {
  display: flex;
  gap: 0.5rem;
}

.rename-container {
  display: flex;
  gap: 0.5rem;
}

.rename-input {
  padding: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.save-btn, .unfollow-btn, .rename-btn, .chat-btn {
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
}

.unfollow-btn {
  background-color: #f44336;
  color: white;
}

.rename-btn {
  background-color: #2196F3;
  color: white;
}

.chat-btn {
  background-color: #4CAF50;
  color: white;
}
/* Friend name and activity info styling */
.friend-info {
  flex: 1;
  text-align: left;
}

.friend-name {
  font-size: 1.5rem;
  color: #294bff;
  margin: 0;
}

.friend-activity {
  font-size: 0.9rem;
  color: #8a2d06;
  font-style: italic;
}

/* Action buttons styling */
.friend-actions {
  display: flex;
  gap: 0.5rem;
}

.unfollow-btn {
  background-color: #ff5252;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.rename-btn {
  background-color: #d8eefe;
  color: #294bff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.chat-btn {
  background-color: #a1f0d2;
  color: #294bff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

/* Hover effects for buttons */
.unfollow-btn:hover {
  background-color: #ff3333;
}

.rename-btn:hover {
  background-color: #c1e3ff;
}

.chat-btn:hover {
  background-color: #81e7b5;
}
    </style>
        