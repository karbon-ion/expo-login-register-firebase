import { router } from "expo-router"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { logoutUser } from "~/services/authService"

export function Logout() {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    async function handleSubmit() {
        setIsSubmitting(true)
        try {
            await logoutUser()
            router.replace('/(tabs)')
        } catch (er) {
            console.log(er, 'er')
        }
        setIsSubmitting(false)
    }

    return (
        <View className="pt-4">
            <TouchableOpacity
                className={`py-4 p-4 rounded-xl shadow ${isSubmitting
                    ? 'bg-blue-300'
                    : 'bg-blue-600 active:bg-blue-700'
                    }`}
                onPress={handleSubmit}
                disabled={isSubmitting}
            >
                <Text className="text-white text-center font-semibold text-lg">
                    {isSubmitting ? 'Loging out...' : 'logout'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}