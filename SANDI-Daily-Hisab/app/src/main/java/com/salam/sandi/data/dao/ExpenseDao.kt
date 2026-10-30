package com.salam.sandi.data.dao

import androidx.room.*
import com.salam.sandi.data.entity.ExpenseEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface ExpenseDao {
    @Query("SELECT * FROM expenses ORDER BY date DESC, time DESC")
    fun getAllExpenses(): Flow<List<ExpenseEntity>>

    @Query("SELECT * FROM expenses WHERE date = :date ORDER BY time DESC")
    fun getExpensesByDate(date: String): Flow<List<ExpenseEntity>>

    @Query("SELECT SUM(amountPoisha) FROM expenses WHERE date = :date")
    fun getTodayExpenseSum(date: String): Flow<Long?>

    @Query("SELECT SUM(amountPoisha) FROM expenses WHERE date LIKE :monthPrefix || '%'")
    fun getMonthlyExpenseSum(monthPrefix: String): Flow<Long?>

    @Query("SELECT SUM(amountPoisha) FROM expenses")
    fun getTotalExpenseSum(): Flow<Long?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertExpense(expense: ExpenseEntity)

    @Update
    suspend fun updateExpense(expense: ExpenseEntity)

    @Delete
    suspend fun deleteExpense(expense: ExpenseEntity)
}
