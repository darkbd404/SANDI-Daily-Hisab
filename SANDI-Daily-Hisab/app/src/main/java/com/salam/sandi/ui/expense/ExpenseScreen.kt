package com.salam.sandi.ui.expense

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.TrendingDown
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.entity.ExpenseEntity
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.components.AddExpenseDialog
import com.salam.sandi.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun ExpenseScreen(repository: SandiRepository) {
    val coroutineScope = rememberCoroutineScope()
    val expenses by repository.allExpenses.collectAsState(initial = emptyList())
    var showAddDialog by remember { mutableStateOf(false) }

    val totalExpensePoisha = expenses.sumOf { it.amountPoisha }

    if (showAddDialog) {
        AddExpenseDialog(
            onDismiss = { showAddDialog = false },
            onSave = { newExpense ->
                coroutineScope.launch {
                    repository.addExpense(newExpense)
                    showAddDialog = false
                }
            }
        )
    }

    Scaffold(
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showAddDialog = true },
                containerColor = ExpenseRed,
                contentColor = TextWhite
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Expense")
            }
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(ObsidianBlack)
                .padding(padding)
                .padding(horizontal = 16.dp, vertical = 8.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "ব্যয় ট্র্যাকার ও খরচ হিসাব",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = ExpenseRed
                        )
                        Text(
                            text = "চার্জিং, মেরামত, নাস্তা ও নিয়মিত মেইনটেন্যান্স বিল",
                            style = MaterialTheme.typography.bodySmall,
                            color = MutedSlate
                        )
                    }
                }
            }

            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = CardNavy),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = "সর্বমোট ব্যয়", style = MaterialTheme.typography.labelSmall, color = MutedSlate)
                            Text(
                                text = "৳ ${totalExpensePoisha / 100.0}",
                                style = MaterialTheme.typography.headlineMedium,
                                fontWeight = FontWeight.Black,
                                color = ExpenseRed
                            )
                        }
                        Surface(
                            color = ExpenseRed.copy(alpha = 0.2f),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text(
                                text = "${expenses.size} টি এন্ট্রি",
                                color = ExpenseRed,
                                style = MaterialTheme.typography.labelMedium,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }

            if (expenses.isEmpty()) {
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = CardNavy.copy(alpha = 0.5f)),
                        shape = RoundedCornerShape(14.dp)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(32.dp),
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.TrendingDown,
                                contentDescription = null,
                                tint = MutedSlate,
                                modifier = Modifier.size(40.dp)
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = "এখনো কোনো ব্যয়ের হিসাব যোগ করা হয়নি",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MutedSlate
                            )
                            Text(
                                text = "নিচের (+) বাটনে চাপ দিয়ে আপনার খরচের হিসাব যোগ করুন",
                                style = MaterialTheme.typography.bodySmall,
                                color = MutedSlate.copy(alpha = 0.7f)
                            )
                        }
                    }
                }
            } else {
                items(expenses) { item ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = CardNavy),
                        shape = RoundedCornerShape(14.dp)
                    ) {
                        Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = item.description,
                                    style = MaterialTheme.typography.bodyLarge,
                                    fontWeight = FontWeight.Bold,
                                    color = TextWhite
                                )
                                Text(
                                    text = "৳ ${item.amountPoisha / 100.0}",
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Black,
                                    color = ExpenseRed
                                )
                            }

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "${item.date}  ${item.time}  ·  ${item.vendorName}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MutedSlate
                                )

                                Surface(
                                    color = ExpenseRed.copy(alpha = 0.15f),
                                    shape = RoundedCornerShape(6.dp)
                                ) {
                                    Text(
                                        text = when(item.category) {
                                            "BATTERY_CHARGING" -> "চার্জিং বিল"
                                            "PERSONAL_EXPENSE" -> "নাস্তা/চা"
                                            "TIRE_TUBE" -> "টায়ার/টিউব"
                                            "VEHICLE_REPAIR" -> "মেরামত"
                                            else -> "অন্যান্য"
                                        },
                                        color = ExpenseRed,
                                        style = MaterialTheme.typography.labelSmall,
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                            }

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.End
                            ) {
                                IconButton(onClick = {
                                    coroutineScope.launch { repository.deleteExpense(item) }
                                }) {
                                    Icon(Icons.Default.Delete, contentDescription = "Delete", tint = ExpenseRed.copy(alpha = 0.7f), modifier = Modifier.size(18.dp))
                                }
                            }
                        }
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(72.dp))
            }
        }
    }
}
