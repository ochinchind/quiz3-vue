
<template>
    <div class="register-page">
        <div v-if="isModalOpen" class="drawer" @click.self="closeModal">
        <div class="drawer-content" style="background: #C1EBF1;">
            <div @click="closeModal" style="background: #FFFFFF; color: black; padding: 1rem; font-size: 2rem; border-radius: 10px; cursor: pointer;">Menu</div>
            <ul style="background: #FFFFFF; padding: 1rem 0rem; border-radius: 12px; margin-top: 1rem;">
            <li v-for="topic in topics" :key="topic" @click="filterByTopic(topic)" style="background: linear-gradient(90deg, #4CD87C 0%, #42D669 63.42%, #3DD55E 100%); padding: 1rem; color: white; font-size: 2rem; ">
                {{ topic }}
            </li>
            </ul>
            <div style="margin-top: 3rem; background: linear-gradient(180deg, #AFF090 0%, #45C330 100%); padding: 1rem; color: white;font-size: 1.5rem; text-align: left">
                <div style="margin-bottom: 1rem; text-align: center;">
                    CONTACTS
                </div>
                <div style="margin-bottom: 1rem;">PHONE: +1(234)-23-45-22</div>
                <div style="margin-bottom: 1rem;">ADDRESS: Green st., Yalow 
                    park</div>
                <div style="margin-bottom: 1rem;">EMAIL: Yallow@park.info</div>
            </div>
        </div>
    </div>

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

        <header class="header-wrapper" style="background: #FFFFFFBD; padding: 1rem;">
        <div class="header" style="display:flex; justify-content: space-between;">
            <button @click="toggleModal" class="" style="border:none; background: none; cursor: pointer;">
                <img src="/static/burger.png" style="width: 50px; height:50px;">
            </button>
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

    <header class="mob-header-wrapper">
      <div 
          class="" 
          style="background: linear-gradient(90deg, #E5F67C 0%, #ECEF64 33%, #D2E037 66%, #EAEE3A 100%); padding:1rem; border-radius: 5%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;">
          <div 
              class="" 
              style="background: linear-gradient(90deg, #FFADAD 0%, #FF774C 100%);
          -webkit-background-clip: text;
          color: transparent; font-weight: 700; font-size: larger;">
              New trips on Fall season! Full details on our Instagram accounts.
          </div>
      </div>
      <div v-if="!isAuth" @click="toggleDropdownAuth"  ref="dropdownAuth" style="position: relative; cursor: pointer; background: #7EEFFF; padding: 0.5rem 1rem; border-radius: 50%; border: none;">
              <div class="dropdown-toggle" :class="{ open: isOpenAuth }" style="    background: none;">
                <img src="/static/img/avatar.png" style="width: 30px; height:30px;     max-width: fit-content;">
              </div>

              <ul v-if="isOpenAuth" class="dropdown-menu" style="width: 200px;left: -100px;">
                <li @click="toggleLoginModal">Login</li>
                <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" to="/register">Register </NuxtLink></li>
              </ul>
            </div>

            <div v-if="isAuth" @click="toggleDropdownAuth"  ref="dropdownAuth" style="position: relative; cursor: pointer; background: #7EEFFF; padding: 0.5rem 1rem; border-radius: 50%; border: none;">
              <div class="dropdown-toggle" :class="{ open: isOpenAuth }" style="    background: none;">
                <img src="/static/img/avatar.png" style="width: 30px; height:30px; max-width: fit-content;">
              </div>

              <ul v-if="isOpenAuth" class="dropdown-menu" style="width: 200px;left: -100px;">
                <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" :to="`/profile/${authUserId}`">My profile </NuxtLink></li>
                <li style="padding: 0;"><NuxtLink style="width: 100%; height: 100%; padding: 1rem; display: block;" to="/favorites">Favorites </NuxtLink></li>
                <li @click="logout">Logout</li>
              </ul>
            </div>
      
    </header>

    
    
        <div style="padding: 2rem;">
            <div class="chat-container">
                <div v-if="messages && messages.length === 0" class="no-messages">
                    <p>No messages yet. Start the conversation!</p>
                </div>
                <div v-else class="messages" ref="messageContainer">
                    <div 
                        v-for="(msg, index) in messages" 
                        :key="index" 
                        :class="['message', msg.user_id_from == authUserId ? 'user' : 'friend']"
                    >
                        <img 
                            :src="msg.user_id_from == authUserId ? msg.avatar_from : msg.avatar_to" 
                            alt="Avatar" 
                            class="avatar" 
                        />
                        
                        <div class="message-content">
                            <span class="name">{{ msg.user_id_from == authUserId ? 'You' : msg.username_from }}</span>
                            <span class="status">{{ msg.user_id_from == authUserId ? 'For now' : formatActivity(msg.last_activity_from) }}</span>
                            <p class="text">{{ msg.message }}</p>
                        </div>
                    </div>
                </div>

                <div class="message-input-container">
                    <input 
                        v-model="newMessage" 
                        type="text" 
                        placeholder="Type a message..." 
                        class="message-input" 
                        @keyup.enter="sendMessage" 
                    />
                    <button @click="sendMessage" class="send-button">Send</button>
                </div>
            </div>
        </div>
    
    </div>

    <div class="mob-footer-sticky" style="position: sticky; bottom: 0; background: linear-gradient(90deg, #A7D759 0%, #84963C 100%); height: 50px;">
    <div style="display:flex; text-align: center; justify-content: center; ">
      <a v-if="isAuth" :href="`/friends/${authUserId}`" style="display: flex; justify-content: center; align-items: center; width: 33.33%; cursor: pointer;">
        <img src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" style="width:40px; height: 40px;" alt="home" />
      </a>
      <div @click="toggleModal" style="display: flex; justify-content: center; align-items: center; width: 33.33%; cursor: pointer;">
        <img src="https://cdn-icons-png.flaticon.com/512/3502/3502685.png" style="width:40px; height: 40px;" alt="plus" />
      </div>
      <a v-if="isAuth" href="/favorites" style="display: flex; justify-content: center; align-items: center; width: 33.33%; cursor: pointer;">
        <img src="https://cdn-icons-png.flaticon.com/512/126/126471.png" style="width:40px; height: 40px;" alt="user" />
      </a>
    </div>
  </div>

    </template>
    <script setup lang="ts">
    import { object, string, number, type InferType } from 'yup'
    import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'
    import { showLoginModal, toggleLoginModal, closeLoginModal } from '~/scripts/loginModal'
    import { isAuth, authUserId, authJwtToken, trueIsAuth, toggleIsAuth, changeIsAuth, falseIsAuth, authUserIdChange, authJwtTokenChange, logout, showForgetPasswordModal, toggleForgetPasswordModal, closeForgetPasswordModal, isLoadingForgetPassword, sendForgetPasswordToEmail, isLoadingForgetChangePassword, changePasswordForget, SendLastActivity } from '~/scripts/auth'
    import { ref as refVue, computed, nextTick } from 'vue'

    
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
    
    const schemaUser = object({
        username: string().required('Username is required').max(255, 'Maximum 255 characters'),
        age: number().required().positive().integer(),
        location: string().nullable(),
    })

    interface Message {
        user_id_to: string;
        message: string;
        avatar_to: string;
        last_activity_to: string;
        username_to: string;
        user_id_from: string;
        avatar_from: string;
        last_activity_from: string;
        username_from: string;
    }

    const route = useRoute();
    const messages = ref<Message[]>([]);

    const newMessage = ref('');

    async function fetchMessages(userId: string): Promise<void>  {
        try {
            const token = authJwtToken ?? localStorage.getItem('jwtToken');
            if (!token) {
                alert('Authentication token is missing.');
                return;
            }

            const response = await fetch(`/api/chat/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authJwtToken.value,
                },
                body: JSON.stringify({})
            });
            if (response.ok) {
                const data = await response.json();
                messages.value = data.messages as Message[];
                console.log("Fetched messages:", messages.value);
                scrollToBottom();
            } else {
                console.error("Failed to fetch friends.");
            }
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    }

    function scrollToBottom() {
        if (messageContainer.value) {
            messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
        }
    }
    watch(messages, async () => {
        await nextTick();  // Wait until messages are rendered
        scrollToBottom();
    });
    async function sendMessage() {
        if (newMessage.value.trim() === '') return;

        const userId = route.params.id as string;
        const token = authJwtToken.value;
        if (!token) {
            alert('Authentication token is missing.');
            return;
        }

        try {
            const response = await fetch(`/api/chatsend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    message: newMessage.value,
                    userId: userId,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    messages.value.push({
                        user_id_from: authUserId,
                        user_id_to: userId,
                        message: newMessage.value,
                        avatar_from: data.avatar,
                        username_from: data.username,
                        last_activity_from: new Date().toISOString(),
                    });
                    newMessage.value = '';
                    scrollToBottom();
                } else {
                    console.error('Message failed to send.');
                }
            } else {
                console.error("Failed to send message.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    const userId = route.params.id || '0';

    // Helper function to format activity (time)
    function formatActivity(lastActivity: string) {
        const timeAgo = formatDistanceToNow(new Date(lastActivity), { addSuffix: true });
        return timeAgo;
    }

    // Scroll to the latest message on load and when messages are updated
    const messageContainer = ref(null);
    onMounted(() => {
    if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
    });
    watch(messages, () => {
    if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
    });
    onMounted(() => {

        var isAuthValue = localStorage.getItem('isAuth');
        var authJwtTokenValue = localStorage.getItem('jwtToken');
        authUserIdChange(isAuthValue ?? '');
        changeIsAuth(isAuthValue !== null && !isNaN(Number(isAuthValue)));
        authJwtTokenChange(authJwtTokenValue ?? '');
        fetchMessages(userId);
    });

    function filterByTopic(topic: string) {
        if (!topic) {
            console.error('Topic is empty');
            return;
        }
        window.location.href = `/?topic=${encodeURIComponent(topic)}`;
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
            
            ] as Person[],
            filteredPersons: [
                
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
            }
        },
        beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    
        },
        methods: {
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
    .chat-container {
  width: 100%;
  height: 600px;
  margin: 20px auto;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.messages {
  overflow-y: auto;
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 10px;
}

.message-content {
  max-width: 60%;
  padding: 10px 15px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.message.user .message-content {
  background-color: #f0f0f0;
}

.name {
  font-weight: bold;
  font-size: 1rem;
  color: #1e3a8a;
}

.friend .name {
  color: #7000c1;
}

.status {
  display: block;
  font-size: 0.9rem;
  color: #39d33e;
  font-style: italic;
  margin-bottom: 5px;
}

.text {
  margin: 0;
  color: #333;
  font-size: 1rem;
}


.message-input-container {
    display: flex;
    gap: 0.5rem;
    padding: 1rem 0;
    border-top: 1px solid #ccc;
}

.message-input {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.send-button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.send-button:hover {
    background-color: #0056b3;
}


.header-wrapper {
  display: none;
}

@media (min-width: 1280px) {
  .header-wrapper {
    display: block;
  }
}

@media (max-width: 1280px) {
  .wrapper-main {
    display: none!important;
  }
}

.mob-header-wrapper {
  display:flex;
  background: linear-gradient(90deg, #E5F67C 0%, #ECEF64 33%, #D2E037 66%, #EAEE3A 100%);
}

@media (min-width: 1280px) {
  .mob-header-wrapper {
    display: none!important;
  }
}

.mob-wrapper-main {
  display: flex;
}

@media (min-width: 1280px) {
  .mob-wrapper-main {
    display: none!important;
  }
}


@media (min-width: 1280px) {
  .mob-footer-sticky {
    display: none!important;
  }
}
    </style>
        