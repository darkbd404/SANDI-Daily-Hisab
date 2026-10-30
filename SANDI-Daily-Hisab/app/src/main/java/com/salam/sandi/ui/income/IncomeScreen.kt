package com.salam.sandi.ui.income

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.entity.IncomeEntity
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.components.AddIncomeDialog
import com.salam.sandi.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun IncomeScreen(repository: SandiRepository) {
    val coroutineScope = rememberCoroutineScope()
    val incomes by repository.allIncomes.collectAsState(initial = emptyList())
    var showAddDialog by remember { mutableStateOf(false) }

    val totalIncomePoisha = incomes.sumOf { it.amountPoisha }

    if (showAddDialog) {
        AddIncomeDialog(
            onDismiss = { showAddDialog = false },
            onSave = { newIncome ->
                coroutineScope.launch {
                    repository.addIncome(newIncome)
                    showAddDialog = false
                }
            }
        )
    }

    Scaffold(
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showAddDialog = true },
                containerColor = IncomeGreen,
                contentColor = ObsidianBlack
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Income")
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
                            text = "আয় ট্র্যাকার ও ভাড়া হিসাব",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = IncomeGreen
                        )
                        Text(
                            text = "সকল ট্রিপ ও যাত্রীর ভাড়ার বিস্তারিত খতিয়ান",
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
                            Text(text = "সর্বমোট আয়", style = MaterialTheme.typography.labelSmall, color = MutedSlate)
                            Text(
                                text = "৳ ${totalIncomePoisha / 100.0}",
                                style = MaterialTheme.typography.headlineMedium,
                                fontWeight = FontWeight.Black,
                                color = IncomeGreen
                            )
                        }
                        Surface(
                            color = IncomeGreen.copy(alpha = 0.2f),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text(
                                text = "${incomes.size} টি এন্ট্রি",
                                color = IncomeGreen,
                                style = MaterialTheme.typography.labelMedium,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }

            if (incomes.isEmpty()) {
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
                                imageVector = Icons.Default.TrendingUp,
                                contentDescription = null,
                                tint = MutedSlate,
                                modifier = Modifier.size(40.dp)
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = "এখনো কোনো আয়ের হিসাব যোগ করা হয়নি",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MutedSlate
                            )
                            Text(
                                text = "নিচের (+) বাটনে চাপ দিয়ে আপনার প্রথম ট্রিপ যোগ করুন",
                                style = MaterialTheme.typography.bodySmall,
                                color = MutedSlate.copy(alpha = 0.7f)
                            )
                        }
                    }
                }
            } else {
                items(incomes) { item ->
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
                                    text = item.tripDescription,
                                    style = MaterialTheme.typography.bodyLarge,
                                    fontWeight = FontWeight.Bold,
                                    color = TextWhite
                                )
                                Text(
                                    text = "৳ ${item.amountPoisha / 100.0}",
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Black,
                                    color = IncomeGreen
                                )
                            }

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "${item.date}  ${item.time}  ·  ${item.startLocation} ➔ ${item.destination}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MutedSlate
                                )

                                Surface(
                                    color = if (item.paymentMethod == "BKASH") ProfitSky.copy(alpha = 0.2f) else GoldAccent.copy(alpha = 0.2f),
                                    shape = RoundedCornerShape(6.dp)
                                ) {
                                    Text(
                                        text = if (item.paymentMethod == "BKASH") "বিকাশ" else "নগদ",
                                        color = if (item.paymentMethod == "BKASH") ProfitSky else GoldAccent,
                                        style = MaterialTheme.typography.labelSmall,
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                            }

                            if (!item.customerName.isNullOrBlank()) {
                                Text(
                                    text = "যাত্রী: ${item.customerName}",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = MutedSlate
                                )
                            }

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.End
                            ) {
                                IconButton(onClick = {
                                    coroutineScope.launch { repository.deleteIncome(item) }
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
