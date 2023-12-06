package song.sam.cozytrain.network

import android.util.Log
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.create
import song.sam.cozytrain.BuildConfig
import song.sam.cozytrain.api.ApiService

object RetrofitService {

    private const val Base_URL = BuildConfig.COZY_TRAIN_SERVER_BASE_URL

    private var authToken = ""

    private var retrofit: Retrofit? = null

    private fun provideOkHttpClient(accessToken: String) : OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(AuthInterceptor(accessToken))
            .build()
    }

    fun setAuthToken(accessToken: String) {
        authToken = accessToken
        retrofit = null
    }

    val instance : ApiService
        get() {
            if(retrofit == null) {
                retrofit =
                    Retrofit.Builder()
                        .baseUrl(Base_URL)
                        .addConverterFactory(GsonConverterFactory.create())
                        .client(provideOkHttpClient(authToken))
                        .build()
            }
            return retrofit!!.create(ApiService::class.java)
        }
}
