package com.salam.sandi.data.dao

import androidx.room.*
import com.salam.sandi.data.entity.IncomeEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface IncomeDao {
    @Query("SELECT * FROM incomes ORDER BY date DESC, time DESC")
    fun getAllIncomes(): Flow<List<IncomeEntity>>

    @Query("SELECT * FROM incomes WHERE date = :date ORDER BY time DESC")
    fun getIncomesByDate(date: String): Flow<List<IncomeEntity>>

    @Query("SELECT SUM(amountPoisha) FROM incomes WHERE date = :date")
    fun getTodayIncomeSum(date: String): Flow<Long?>

    @Query("SELECT SUM(amountPoisha) FROM incomes WHERE date LIKE :monthPrefix || '%'")
    fun getMonthlyIncomeSum(monthPrefix: String): Flow<Long?>

    @Query("SELECT SUM(amountPoisha) FROM incomes")
    fun getTotalIncomeSum(): Flow<Long?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertIncome(income: IncomeEntity)

    @Update
    suspend fun updateIncome(income: IncomeEntity)

    @Delete
    suspend fun deleteIncome(income: IncomeEntity)
}
